package com.jusceconfeitaria.repository;

import com.jusceconfeitaria.model.OrderSelection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderSelectionRepository extends JpaRepository<OrderSelection, Integer> {}
