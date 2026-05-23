package com.jusceconfeitaria.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

@Entity
@Table(name = "option_groups")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OptionGroup {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(nullable = false, length = 100)
  private String name;

  @Column(name = "max_selection", nullable = false)
  private Integer maxSelection;

  @Column(name = "is_required", nullable = false)
  private Boolean isRequired = false;

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

  @Column(name = "min_selection", nullable = false)
  private Integer minSelection = 0;

  @Column(name = "is_active", nullable = false)
  private Boolean isActive = true;

  @PrePersist
  protected void onCreate() {
    createdAt = LocalDateTime.now();
    updatedAt = LocalDateTime.now();
  }

  @PreUpdate
  protected void onUpdate() {
    updatedAt = LocalDateTime.now();
  }
}
