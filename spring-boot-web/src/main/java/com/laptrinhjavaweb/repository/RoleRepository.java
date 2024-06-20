package com.laptrinhjavaweb.repository;

import com.laptrinhjavaweb.entity.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository {
    RoleEntity findOneByCode(String code);
}

// extends JpaRepository<RoleEntity, Long>