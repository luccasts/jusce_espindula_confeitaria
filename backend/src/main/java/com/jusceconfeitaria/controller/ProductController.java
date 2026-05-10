package com.jusceconfeitaria.controller;

import com.jusceconfeitaria.exceptions.RecursoNaoEncontradoException;
import com.jusceconfeitaria.model.Product;
import com.jusceconfeitaria.repository.ProductRepository;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
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
