package com.jusceconfeitaria.repository;

import com.jusceconfeitaria.model.CakeSize;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CakeSizeRepository extends JpaRepository<CakeSize, Integer> {

    List<CakeSize> findByIsActiveTrueOrderByDisplayOrderAsc();
}