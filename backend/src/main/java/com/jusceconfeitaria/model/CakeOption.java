package com.jusceconfeitaria.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

@Entity
@Table(name = "cake_options")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CakeOption {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "group_id", nullable = false)
  private OptionGroup group;

  @Column(nullable = false, length = 100)
  private String name;

  @Column(name = "is_active", nullable = false)
  private Boolean isActive = true;

  @Column(name = "display_order")
  private Integer displayOrder;

  @Column(
      name = "created_at",
      nullable = false,
      updatable = false,
      columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
  @CreatedDate
  private LocalDateTime createdAt;

  @Column(
      name = "updated_at",
      columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
  @LastModifiedDate
  private LocalDateTime updatedAt;

  @Column(columnDefinition = "TEXT")
  private String description;

  @Column(name = "image_url", length = 255)
  private String imageUrl;

  @Column(name = "price_extra", precision = 10, scale = 2)
  private BigDecimal priceExtra;

  @PrePersist
  protected void onCreate() {
    createdAt = LocalDateTime.now();
    updatedAt = LocalDateTime.now();
    if (isActive == null) {
      isActive = true;
    }
  }

  @PreUpdate
  protected void onUpdate() {
    updatedAt = LocalDateTime.now();
  }
}
