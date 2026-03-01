package com.jusceconfeitaria.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.time.Instant;

@Entity
@Table(name = "pedidos")
public class Pedido {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(columnDefinition = "TIMESTAMP")
  private Instant momento;

  // Status do pedido (ex: PENDENTE, ENTREGUE, CANCELADO)
  private Integer statusPedido;

  // Relacionamento: Vários pedidos pertencem a um Usuário (Cliente)
  @NotNull(message = "O pedido precisa estar vinculado a um cliente")
  @ManyToOne
  @JoinColumn(name = "usuario_id", nullable = false)
  private User
      cliente; // Atenção: se sua classe de usuário chama "User", use "User" aqui. Se for "Usuario",

  // use "Usuario".

  public Pedido() {}

  // Getters e Setters
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Instant getMomento() {
    return momento;
  }

  public void setMomento(Instant momento) {
    this.momento = momento;
  }

  public Integer getStatusPedido() {
    return statusPedido;
  }

  public void setStatusPedido(Integer statusPedido) {
    this.statusPedido = statusPedido;
  }

  public User getCliente() {
    return cliente;
  }

  public void setCliente(User cliente) {
    this.cliente = cliente;
  }
}
