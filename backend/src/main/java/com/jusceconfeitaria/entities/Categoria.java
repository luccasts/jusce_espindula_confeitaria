package com.jusceconfeitaria.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "categorias")
public class Categoria {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank(message = "O nome da categoria é obrigatório!")
  @Size(min = 3, message = "O nome deve ter pelo menos 3 caracteres")
  @Column(nullable = false, length = 100)
  private String nome;

  @Column(columnDefinition = "TEXT")
  private String descricao;

  // Relacionamento: Uma Categoria possui Vários Produtos
  @OneToMany(mappedBy = "categoria")
  private List<Produto> produtos = new ArrayList<>();

  public Categoria() {}

  // Getters e Setters
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getNome() {
    return nome;
  }

  public void setNome(String nome) {
    this.nome = nome;
  }

  public String getDescricao() {
    return descricao;
  }

  public void setDescricao(String descricao) {
    this.descricao = descricao;
  }

  public List<Produto> getProdutos() {
    return produtos;
  }
}
