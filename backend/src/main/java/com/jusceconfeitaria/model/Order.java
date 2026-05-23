package com.jusceconfeitaria.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;

@Entity
@Table(name = "orders")
@Data
public class Order {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private User user;

  @Column(name = "customer_name", length = 150)
  private String customerName;

  @Column(name = "customer_phone", length = 20)
  private String customerPhone;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "cake_size_id", nullable = false)
  private CakeSize cakeSize;

  @Column(name = "total_price", nullable = false, precision = 10, scale = 2)
  private BigDecimal totalPrice;

  @Column(columnDefinition = "TEXT")
  private String observations;

  @Enumerated(EnumType.STRING)
  @Column(length = 20)
  private OrderStatus status = OrderStatus.PENDING;

  @Column(
      name = "created_at",
      insertable = false,
      updatable = false,
      columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
  @CreatedDate
  private LocalDateTime createdAt;
}
