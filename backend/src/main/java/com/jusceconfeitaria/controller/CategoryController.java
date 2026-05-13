package com.jusceconfeitaria.controller;

import com.jusceconfeitaria.exceptions.RecursoNaoEncontradoException;
import com.jusceconfeitaria.model.Category;
import com.jusceconfeitaria.repository.CategoryRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/categorias")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CategoryController {

  @Autowired private CategoryRepository categoryRepository;

  public record CategoryDTO(Integer id, String slug, String nome, Integer ordemExibicao) {}

  public record CreateCategoryDTO(String slug, String nome, Integer ordemExibicao) {}

  @GetMapping
  public List<CategoryDTO> listarCategorias() {
    return categoryRepository.findByIsActiveTrueOrderByDisplayOrderAsc().stream()
        .map(this::toDTO)
        .collect(Collectors.toList());
  }

  @GetMapping("/{id}")
  public CategoryDTO buscarCategoria(@PathVariable Integer id) {
    Category categoria =
        categoryRepository
            .findById(id)
            .orElseThrow(
                () -> new RecursoNaoEncontradoException("Categoria não encontrada: id=" + id));
    return toDTO(categoria);
  }

  @PostMapping
  public ResponseEntity<CategoryDTO> criarCategoria(@RequestBody CreateCategoryDTO dto) {
    Category categoria = new Category();
    categoria.setSlug(dto.slug());
    categoria.setName(dto.nome());
    categoria.setDisplayOrder(dto.ordemExibicao() != null ? dto.ordemExibicao() : 0);
    categoria.setIsActive(true);

    Category categoriaSalva = categoryRepository.save(categoria);
    return ResponseEntity.status(HttpStatus.CREATED).body(toDTO(categoriaSalva));
  }

  @PutMapping("/{id}")
  public ResponseEntity<CategoryDTO> atualizarCategoria(
      @PathVariable Integer id, @RequestBody CreateCategoryDTO dto) {
    Category categoria =
        categoryRepository
            .findById(id)
            .orElseThrow(
                () -> new RecursoNaoEncontradoException("Categoria não encontrada: id=" + id));

    categoria.setSlug(dto.slug());
    categoria.setName(dto.nome());
    categoria.setDisplayOrder(dto.ordemExibicao() != null ? dto.ordemExibicao() : 0);

    Category categoriaAtualizada = categoryRepository.save(categoria);
    return ResponseEntity.ok(toDTO(categoriaAtualizada));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deletarCategoria(@PathVariable Integer id) {
    Category categoria =
        categoryRepository
            .findById(id)
            .orElseThrow(
                () -> new RecursoNaoEncontradoException("Categoria não encontrada: id=" + id));

    categoria.setIsActive(false);
    categoryRepository.save(categoria);
    return ResponseEntity.noContent().build();
  }

  private CategoryDTO toDTO(Category c) {
    return new CategoryDTO(c.getId(), c.getSlug(), c.getName(), c.getDisplayOrder());
  }
}
