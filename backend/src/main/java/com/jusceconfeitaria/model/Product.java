package com.jusceconfeitaria.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(
      name = "product_categories",
      joinColumns = @JoinColumn(name = "product_id"),
      inverseJoinColumns = @JoinColumn(name = "category_id"))
  private List<Category> categories = new ArrayList<>();

  @Column(nullable = false, length = 150)
  private String name;

  @Column(columnDefinition = "TEXT")
  private String description;

  @Column(precision = 10, scale = 2)
  private BigDecimal price;

  @Column(name = "image_url", length = 255)
  private String imageUrl;

  @Column(name = "is_active", nullable = false)
  private Boolean isActive = true;

  @Column(name = "created_at", insertable = false, updatable = false)
  private LocalDateTime createdAt;

  @Column(name = "updated_at", insertable = false, updatable = false)
  private LocalDateTime updatedAt;

  @Column(name = "is_price_on_request")
  private Boolean isPriceOnRequest = false;

  @Column(name = "badge", length = 50)
  private String badge;

  @Column(name = "badge_class", length = 50)
  private String badgeClass;

  @Column(name = "display_order")
  private Integer displayOrder;

  @PrePersist
  protected void onCreate() {
    if (isActive == null) {
      isActive = true;
    }
    if (isPriceOnRequest == null) {
      isPriceOnRequest = false;
    }
  }
}
