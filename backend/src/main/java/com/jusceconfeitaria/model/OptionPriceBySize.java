package com.jusceconfeitaria.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(
    name = "option_prices_by_size",
    uniqueConstraints = @UniqueConstraint(columnNames = {"option_id", "size_id"}))
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OptionPriceBySize {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "option_id", nullable = false)
  private CakeOption option;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "size_id", nullable = false)
  private CakeSize size;

  @Column(name = "additional_price", nullable = false, precision = 10, scale = 2)
  private BigDecimal additionalPrice;
}
