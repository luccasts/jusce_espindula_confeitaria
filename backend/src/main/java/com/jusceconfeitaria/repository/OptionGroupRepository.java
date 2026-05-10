package com.jusceconfeitaria.repository;

import com.jusceconfeitaria.model.OptionGroup;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OptionGroupRepository extends JpaRepository<OptionGroup, Integer> {

    List<OptionGroup> findAllByOrderByDisplayOrderAsc();
}