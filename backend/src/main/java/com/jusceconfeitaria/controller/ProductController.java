package com.jusceconfeitaria.controller;

import com.jusceconfeitaria.exceptions.RecursoNaoEncontradoException;
import com.jusceconfeitaria.model.Product;
import com.jusceconfeitaria.repository.ProductRepository;
import com.jusceconfeitaria.service.FileStorageService;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/produtos")
public class ProductController {

  @Autowired private ProductRepository productRepository;
  @Autowired private FileStorageService fileStorageService;

  public record ProductDTO(
      Integer id,
      String nome,
      String descricao,
      BigDecimal preco,
      Boolean precoPorSolicitacao,
      String imagemUrl,
      String badge,
      String badgeClass,
      Integer ordemExibicao,
      List<String> categorias) {}

  public record CreateProductDTO(
      String nome,
      String descricao,
      BigDecimal preco,
      Boolean precoPorSolicitacao,
      String imagemUrl,
      String badge,
      String badgeClass,
      Integer ordemExibicao) {}

  @GetMapping
  public List<ProductDTO> listarProdutos() {
    return productRepository.findByIsActiveTrueOrderByDisplayOrderAsc().stream()
        .map(this::toDTO)
        .collect(Collectors.toList());
  }

  @GetMapping("/{id}")
  public ProductDTO buscarProduto(@PathVariable Integer id) {
    Product produto =
        productRepository
            .findById(id)
            .orElseThrow(
                () -> new RecursoNaoEncontradoException("Produto não encontrado: id=" + id));
    return toDTO(produto);
  }

  @PostMapping(consumes = "multipart/form-data")
  public ResponseEntity<ProductDTO> criarProduto(
      @RequestParam String nome,
      @RequestParam(required = false) String descricao,
      @RequestParam(required = false) BigDecimal preco,
      @RequestParam(defaultValue = "false") Boolean precoPorSolicitacao,
      @RequestParam(required = false) MultipartFile imagem,
      @RequestParam(required = false) String imagemUrl, // FIX: aceita URL de imagem externa
      @RequestParam(required = false) String badge,
      @RequestParam(required = false) String badgeClass,
      @RequestParam(defaultValue = "0") Integer ordemExibicao) {

    if (nome == null || nome.isBlank()) {
      throw new IllegalArgumentException("Nome do produto é obrigatório.");
    }

    if (!Boolean.TRUE.equals(precoPorSolicitacao) && preco == null) {
      throw new IllegalArgumentException(
          "Preço é obrigatório quando não é 'preço por solicitação'.");
    }

    Product produto = new Product();
    produto.setName(nome);
    produto.setDescription(descricao);
    produto.setPrice(preco);
    produto.setIsPriceOnRequest(precoPorSolicitacao);
    produto.setBadge(badge);
    produto.setBadgeClass(badgeClass);
    produto.setDisplayOrder(ordemExibicao);
    produto.setIsActive(true);

    // FIX: prioriza arquivo enviado; se não houver, usa URL de texto
    if (imagem != null && !imagem.isEmpty()) {
      String caminho = fileStorageService.salvar(imagem);
      produto.setImageUrl(caminho);
    } else if (imagemUrl != null && !imagemUrl.isBlank()) {
      produto.setImageUrl(imagemUrl);
    }

    Product salvo = productRepository.save(produto);
    return ResponseEntity.status(HttpStatus.CREATED).body(toDTO(salvo));
  }

  @PutMapping(value = "/{id}", consumes = "multipart/form-data")
  public ResponseEntity<ProductDTO> atualizarProduto(
      @PathVariable Integer id,
      @RequestParam String nome,
      @RequestParam(required = false) String descricao,
      @RequestParam(required = false) BigDecimal preco,
      @RequestParam(defaultValue = "false") Boolean precoPorSolicitacao,
      @RequestParam(required = false) MultipartFile imagem,
      @RequestParam(required = false) String imagemUrl, // FIX: aceita URL de imagem externa
      @RequestParam(required = false) String badge,
      @RequestParam(required = false) String badgeClass,
      @RequestParam(defaultValue = "0") Integer ordemExibicao) {

    if (nome == null || nome.isBlank()) {
      throw new IllegalArgumentException("Nome do produto é obrigatório.");
    }

    if (!Boolean.TRUE.equals(precoPorSolicitacao) && preco == null) {
      throw new IllegalArgumentException(
          "Preço é obrigatório quando não é 'preço por solicitação'.");
    }

    Product produto =
        productRepository
            .findById(id)
            .orElseThrow(
                () -> new RecursoNaoEncontradoException("Produto não encontrado: id=" + id));

    produto.setName(nome);
    produto.setDescription(descricao);
    produto.setPrice(preco);
    produto.setIsPriceOnRequest(precoPorSolicitacao);
    produto.setBadge(badge);
    produto.setBadgeClass(badgeClass);
    produto.setDisplayOrder(ordemExibicao);

    // FIX: prioriza arquivo enviado; se não houver, usa URL de texto
    if (imagem != null && !imagem.isEmpty()) {
      String caminho = fileStorageService.salvar(imagem);
      produto.setImageUrl(caminho);
    } else if (imagemUrl != null && !imagemUrl.isBlank()) {
      produto.setImageUrl(imagemUrl);
    }
    // Se ambos vazios, mantém a imageUrl que já estava salva no banco

    Product atualizado = productRepository.save(produto);
    return ResponseEntity.ok(toDTO(atualizado));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deletarProduto(@PathVariable Integer id) {
    Product produto =
        productRepository
            .findById(id)
            .orElseThrow(
                () -> new RecursoNaoEncontradoException("Produto não encontrado: id=" + id));

    produto.setIsActive(false);
    productRepository.save(produto);
    return ResponseEntity.noContent().build();
  }

  private ProductDTO toDTO(Product p) {
    List<String> categorias =
        p.getCategories() == null
            ? List.of()
            : p.getCategories().stream().map(c -> c.getSlug()).toList();

    return new ProductDTO(
        p.getId(),
        p.getName(),
        p.getDescription(),
        p.getPrice(),
        p.getIsPriceOnRequest(),
        p.getImageUrl(),
        p.getBadge(),
        p.getBadgeClass(),
        p.getDisplayOrder(),
        categorias);
  }
}
