package com.jusceconfeitaria.controller;

import com.jusceconfeitaria.exceptions.RecursoNaoEncontradoException;
import com.jusceconfeitaria.model.Product;
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
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProductController {

  @Autowired private ProductRepository productRepository;

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

  @PostMapping
  public ResponseEntity<ProductDTO> criarProduto(@RequestBody CreateProductDTO dto) {
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

    Product produtoSalvo = productRepository.save(produto);
    return ResponseEntity.status(HttpStatus.CREATED).body(toDTO(produtoSalvo));
  }

  @PutMapping("/{id}")
  public ResponseEntity<ProductDTO> atualizarProduto(
      @PathVariable Integer id, @RequestBody CreateProductDTO dto) {
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
    produto.setImageUrl(dto.imagemUrl());
    produto.setBadge(dto.badge());
    produto.setBadgeClass(dto.badgeClass());
    produto.setDisplayOrder(dto.ordemExibicao() != null ? dto.ordemExibicao() : 0);

    Product produtoAtualizado = productRepository.save(produto);
    return ResponseEntity.ok(toDTO(produtoAtualizado));
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
