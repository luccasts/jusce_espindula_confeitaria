package com.jusceconfeitaria.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "users")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank(message = "O nome do usuário é obrigatório")
  @Column(nullable = false, length = 150)
  private String nome;

  @NotBlank(message = "O e-mail é obrigatório")
  @Email(message = "Formato de e-mail inválido")
  @Column(nullable = false, unique = true, length = 100)
  private String email;

  @NotBlank(message = "A senha é obrigatória")
  @Size(min = 6, message = "A senha deve ter pelo menos 6 caracteres")
  @Column(nullable = false)
  private String senha;

  @Column(length = 20)
  private String telefone;

  public User() {}

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

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getSenha() {
    return senha;
  }

  public void setSenha(String senha) {
    this.senha = senha;
  }

  public String getTelefone() {
    return telefone;
  }

  public void setTelefone(String telefone) {
    this.telefone = telefone;
  }
}
