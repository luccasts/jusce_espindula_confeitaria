package com.jusceconfeitaria.services;

import com.jusceconfeitaria.entities.Categoria;
import com.jusceconfeitaria.exceptions.RecursoNaoEncontradoException;
import com.jusceconfeitaria.repositories.CategoriaRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class CategoriaService {

  private final CategoriaRepository repository;

  public CategoriaService(CategoriaRepository repository) {
    this.repository = repository;
  }

  public List<Categoria> listarTodas() {
    return repository.findAll();
  }

  public Categoria salvar(Categoria categoria) {
    return repository.save(categoria);
  }

  public Categoria buscarPorId(Long id) {
    return repository
        .findById(id)
        .orElseThrow(() -> new RecursoNaoEncontradoException("Categoria não encontrada!"));
  }

  public Categoria atualizar(Long id, Categoria categoria) {
    buscarPorId(id);
    categoria.setId(id);
    return repository.save(categoria);
  }

  public void deletar(Long id) {
    buscarPorId(id);
    repository.deleteById(id);
  }
}
