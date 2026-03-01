package com.jusceconfeitaria.controllers;

import com.jusceconfeitaria.entities.Categoria;
import com.jusceconfeitaria.services.CategoriaService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {

  private final CategoriaService service;

  public CategoriaController(CategoriaService service) {
    this.service = service;
  }

  @GetMapping
  public ResponseEntity<List<Categoria>> listarTodas() {
    return ResponseEntity.ok(service.listarTodas());
  }

  @GetMapping("/{id}")
  public ResponseEntity<Categoria> buscarPorId(@PathVariable Long id) {
    return ResponseEntity.ok(service.buscarPorId(id));
  }

  @PostMapping
  public ResponseEntity<Categoria> salvar(@Valid @RequestBody Categoria categoria) {
    return ResponseEntity.status(HttpStatus.CREATED).body(service.salvar(categoria));
  }

  @PutMapping("/{id}")
  public ResponseEntity<Categoria> atualizar(
      @PathVariable Long id, @Valid @RequestBody Categoria categoria) {
    return ResponseEntity.ok(service.atualizar(id, categoria));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deletar(@PathVariable Long id) {
    service.deletar(id);
    return ResponseEntity.noContent().build();
  }
}
