package com.jusceconfeitaria.repository;

import com.jusceconfeitaria.model.Category;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {

  List<Category> findByIsActiveTrueOrderByDisplayOrderAsc();

  Optional<Category> findBySlug(String slug);

  Optional<Category> findByName(String name);
}
