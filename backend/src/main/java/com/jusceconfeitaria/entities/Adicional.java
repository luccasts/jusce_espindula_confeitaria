package com.jusceconfeitaria.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "adicionais")
public class Adicional {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank(message = "O nome do adicional é obrigatório")
  @Column(nullable = false, length = 100)
  private String nome;

  @NotNull(message = "O preço do adicional é obrigatório")
  @PositiveOrZero(message = "O preço não pode ser negativo")
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
