package com.jusceconfeitaria.controller;

import com.jusceconfeitaria.exceptions.RecursoNaoEncontradoException;
import com.jusceconfeitaria.model.Category;
import com.jusceconfeitaria.model.Product;
import com.jusceconfeitaria.repository.CategoryRepository;
import com.jusceconfeitaria.repository.ProductRepository;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/produtos")
public class ProductController {

  @Autowired private ProductRepository productRepository;
  @Autowired private CategoryRepository categoryRepository;

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
      List<CategoriaDTO> categorias) {}

  public record CategoriaDTO(Integer id, String slug, String nome) {}

  public record CreateProductDTO(
      String nome,
      String descricao,
      BigDecimal preco,
      Boolean precoPorSolicitacao,
      String imagemUrl,
      String badge,
      String badgeClass,
      Integer ordemExibicao,
      List<Integer> categoriaIds) {}

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

  @PostMapping(consumes = "application/json")
  public ResponseEntity<ProductDTO> criarProduto(@RequestBody CreateProductDTO dto) {

    if (dto.nome() == null || dto.nome().isBlank()) {
      throw new IllegalArgumentException("Nome do produto é obrigatório.");
    }

    if (!Boolean.TRUE.equals(dto.precoPorSolicitacao()) && dto.preco() == null) {
      throw new IllegalArgumentException(
          "Preço é obrigatório quando não é 'preço por solicitação'.");
    }

    Product produto = new Product();
    produto.setName(dto.nome());
    produto.setDescription(dto.descricao());
    produto.setPrice(dto.preco());
    produto.setIsPriceOnRequest(
        dto.precoPorSolicitacao() != null ? dto.precoPorSolicitacao() : false);
    produto.setImageUrl(dto.imagemUrl());
    produto.setBadge(dto.badge());
    produto.setBadgeClass(dto.badgeClass());
    produto.setDisplayOrder(dto.ordemExibicao() != null ? dto.ordemExibicao() : 0);
    produto.setIsActive(true);

    if (dto.categoriaIds() != null && !dto.categoriaIds().isEmpty()) {
      List<Category> categorias =
          categoryRepository.findAllById(dto.categoriaIds()).stream()
              .filter(c -> Boolean.TRUE.equals(c.getIsActive()))
              .collect(Collectors.toList());
      produto.setCategories(categorias);
    }

    Product salvo = productRepository.save(produto);
    return ResponseEntity.status(HttpStatus.CREATED).body(toDTO(salvo));
  }

  @PutMapping(value = "/{id}", consumes = "application/json")
  public ResponseEntity<ProductDTO> atualizarProduto(
      @PathVariable Integer id, @RequestBody CreateProductDTO dto) {

    if (dto.nome() == null || dto.nome().isBlank()) {
      throw new IllegalArgumentException("Nome do produto é obrigatório.");
    }

    if (!Boolean.TRUE.equals(dto.precoPorSolicitacao()) && dto.preco() == null) {
      throw new IllegalArgumentException(
          "Preço é obrigatório quando não é 'preço por solicitação'.");
    }

    Product produto =
        productRepository
            .findById(id)
            .orElseThrow(
                () -> new RecursoNaoEncontradoException("Produto não encontrado: id=" + id));

    produto.setName(dto.nome());
    produto.setDescription(dto.descricao());
    produto.setPrice(dto.preco());
    produto.setIsPriceOnRequest(
        dto.precoPorSolicitacao() != null ? dto.precoPorSolicitacao() : false);

    if (dto.imagemUrl() != null && !dto.imagemUrl().isBlank()) {
      produto.setImageUrl(dto.imagemUrl());
    }

    produto.setBadge(dto.badge());
    produto.setBadgeClass(dto.badgeClass());
    produto.setDisplayOrder(dto.ordemExibicao() != null ? dto.ordemExibicao() : 0);

    if (dto.categoriaIds() != null) {
      List<Category> categorias =
          categoryRepository.findAllById(dto.categoriaIds()).stream()
              .filter(c -> Boolean.TRUE.equals(c.getIsActive()))
              .collect(Collectors.toList());
      produto.setCategories(categorias);
    }

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
    List<CategoriaDTO> categorias =
        p.getCategories() == null
            ? List.of()
            : p.getCategories().stream()
                .filter(c -> Boolean.TRUE.equals(c.getIsActive()))
                .map(c -> new CategoriaDTO(c.getId(), c.getSlug(), c.getName()))
                .collect(Collectors.toList());

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
