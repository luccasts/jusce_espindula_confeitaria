package com.jusceconfeitaria.repository;

import com.jusceconfeitaria.model.Order;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
  List<Order> findAllByOrderByCreatedAtDesc();
}
