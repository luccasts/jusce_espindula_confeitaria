package com.jusceconfeitaria.services;

import com.jusceconfeitaria.entities.Produto;
import com.jusceconfeitaria.repositories.ProdutoRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ProdutoService {

  private final ProdutoRepository repository;

  public ProdutoService(ProdutoRepository repository) {
    this.repository = repository;
  }

  public List<Produto> listarTodos() {
    return repository.findAll();
  }

  public Produto salvar(Produto produto) {
    return repository.save(produto);
  }

  public Produto buscarPorId(Long id) {
    return repository
        .findById(id)
        .orElseThrow(
            () ->
                new com.jusceconfeitaria.exceptions.RecursoNaoEncontradoException(
                    "Produto não encontrado!"));
  }

  public void deletar(Long id) {
    buscarPorId(id);
    repository.deleteById(id);
  }

  public Produto atualizar(Long id, Produto produto) {
    buscarPorId(id);
    produto.setId(id);
    return repository.save(produto);
  }
}
