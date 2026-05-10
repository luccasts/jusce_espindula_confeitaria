package com.jusceconfeitaria.repository;

import com.jusceconfeitaria.model.Product;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByIsActiveTrueOrderByDisplayOrderAsc();
}