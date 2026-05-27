package com.jusceconfeitaria.controller;

import com.jusceconfeitaria.exceptions.RecursoNaoEncontradoException;
import com.jusceconfeitaria.model.Category;
import com.jusceconfeitaria.repository.CategoryRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/categorias")
public class CategoryController {

  @Autowired private CategoryRepository categoryRepository;

  public record CategoryDTO(Integer id, String slug, String nome, Integer ordemExibicao) {}

  public record CreateCategoryDTO(
      @NotBlank(message = "Slug é obrigatório") String slug,
      @NotBlank(message = "Nome é obrigatório") String nome,
      Integer ordemExibicao) {}

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
            .filter(c -> Boolean.TRUE.equals(c.getIsActive()))
            .orElseThrow(
                () -> new RecursoNaoEncontradoException("Categoria não encontrada: id=" + id));
    return toDTO(categoria);
  }

  @PostMapping
  public ResponseEntity<CategoryDTO> criarCategoria(@Valid @RequestBody CreateCategoryDTO dto) {
    final String slug = dto.slug().toLowerCase(Locale.ROOT).trim();
    final String nome = dto.nome().trim();

    categoryRepository
        .findBySlug(slug)
        .ifPresent(
            existing -> {
              throw new IllegalArgumentException(
                  "Já existe uma categoria com o slug '" + slug + "'.");
            });

    categoryRepository
        .findByName(nome)
        .ifPresent(
            existing -> {
              throw new IllegalArgumentException(
                  "Já existe uma categoria com o nome '" + nome + "'.");
            });

    Category categoria = new Category();
    categoria.setSlug(slug);
    categoria.setName(nome);
    categoria.setDisplayOrder(dto.ordemExibicao() != null ? dto.ordemExibicao() : 0);
    categoria.setIsActive(true);

    Category categoriaSalva = categoryRepository.save(categoria);
    return ResponseEntity.status(HttpStatus.CREATED).body(toDTO(categoriaSalva));
  }

  @PutMapping("/{id}")
  public ResponseEntity<CategoryDTO> atualizarCategoria(
      @PathVariable Integer id, @Valid @RequestBody CreateCategoryDTO dto) {
    Category categoria =
        categoryRepository
            .findById(id)
            .filter(c -> Boolean.TRUE.equals(c.getIsActive()))
            .orElseThrow(
                () -> new RecursoNaoEncontradoException("Categoria não encontrada: id=" + id));

    final String slug = dto.slug().toLowerCase(Locale.ROOT).trim();
    final String nome = dto.nome().trim();

    categoryRepository
        .findBySlug(slug)
        .filter(c -> !c.getId().equals(id))
        .ifPresent(
            c -> {
              throw new IllegalArgumentException(
                  "Já existe uma categoria com o slug '" + slug + "'.");
            });

    categoryRepository
        .findByName(nome)
        .filter(c -> !c.getId().equals(id))
        .ifPresent(
            c -> {
              throw new IllegalArgumentException(
                  "Já existe uma categoria com o nome '" + nome + "'.");
            });

    categoria.setSlug(slug);
    categoria.setName(nome);
    categoria.setDisplayOrder(dto.ordemExibicao() != null ? dto.ordemExibicao() : 0);

    Category categoriaAtualizada = categoryRepository.save(categoria);
    return ResponseEntity.ok(toDTO(categoriaAtualizada));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deletarCategoria(@PathVariable Integer id) {
    Category categoria =
        categoryRepository
            .findById(id)
            .filter(c -> Boolean.TRUE.equals(c.getIsActive()))
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
