package com.laptrinhjavaweb.repository.impl;

import com.laptrinhjavaweb.entity.RoleEntity;
import com.laptrinhjavaweb.mapper.RoleMapper;
import com.laptrinhjavaweb.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class RoleRepositoryImpl implements RoleRepository {

    @Autowired
    private RoleMapper roleMapper;

    @Override
    public RoleEntity findOneByCode(String code) {
        return null;
    }
}
