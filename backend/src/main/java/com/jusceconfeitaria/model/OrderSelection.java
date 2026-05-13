package com.jusceconfeitaria.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "order_selections")
@Data
public class OrderSelection {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "order_id", nullable = false)
  private Order order;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "option_id", nullable = false)
  private CakeOption option;
}
