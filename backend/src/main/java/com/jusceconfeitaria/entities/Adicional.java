package com.jusceconfeitaria.entities;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "adicionais")
public class Adicional {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 100)
  private String nome;

  @Column(precision = 10, scale = 2)
  private BigDecimal precoAdicional;

  // Relacionamento Bidirecional (Opcional, mas útil se quiser buscar os produtos por adicional)
  @ManyToMany(mappedBy = "adicionais")
  private Set<Produto> produtos = new HashSet<>();

  public Adicional() {}

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

  public BigDecimal getPrecoAdicional() {
    return precoAdicional;
  }

  public void setPrecoAdicional(BigDecimal precoAdicional) {
    this.precoAdicional = precoAdicional;
  }

  public Set<Produto> getProdutos() {
    return produtos;
  }
}
