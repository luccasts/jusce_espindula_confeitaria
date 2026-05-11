package com.jusceconfeitaria.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    @Column(nullable = false, length = 150)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "image_url", length = 255)
    private String imageUrl;

    @Column(name = "price_extra", precision = 10, scale = 2)
    private BigDecimal priceExtra;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @Column(name = "display_order")
    private Integer displayOrder;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;
}