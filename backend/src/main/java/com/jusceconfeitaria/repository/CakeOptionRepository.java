package com.jusceconfeitaria.repository;

import com.jusceconfeitaria.model.CakeOption;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CakeOptionRepository extends JpaRepository<CakeOption, Integer> {

    List<CakeOption> findByGroupIdAndIsActiveTrueOrderByDisplayOrderAsc(Integer groupId);
}