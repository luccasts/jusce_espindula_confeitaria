package com.jusceconfeitaria.controllers;

import com.jusceconfeitaria.entities.Produto;
import com.jusceconfeitaria.services.ProdutoService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {

  private final ProdutoService service;

  public ProdutoController(ProdutoService service) {
    this.service = service;
  }

  @GetMapping
  public ResponseEntity<List<Produto>> listarTodos() {
    List<Produto> produtos = service.listarTodos();
    return ResponseEntity.ok(produtos);
  }

  @PostMapping
  public ResponseEntity<Produto> criar(@Valid @RequestBody Produto produto) {
    Produto produtoSalvo = service.salvar(produto);
    return ResponseEntity.status(HttpStatus.CREATED).body(produtoSalvo);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Produto> buscarPorId(@PathVariable Long id) {
    return ResponseEntity.ok(service.buscarPorId(id));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deletar(@PathVariable Long id) {
    service.deletar(id);
    return ResponseEntity.noContent().build();
  }

  @PutMapping("/{id}")
  public ResponseEntity<Produto> atualizar(
      @PathVariable Long id, @Valid @RequestBody Produto produto) {
    Produto produtoAtualizado = service.atualizar(id, produto);
    return ResponseEntity.ok(produtoAtualizado);
  }
}
