package com.laptrinhjavaweb.repository.impl;

import com.laptrinhjavaweb.repository.BuildingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BuildingRepositoryImpl implements BuildingRepository {


    @Override
    public void deleteByIdIn(List<Long> buildingIds) {

    }

    @Override
    public Long countByIdIn(List<Long> buildingIds) {
        return 1L;
    }
}
