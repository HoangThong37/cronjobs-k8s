package com.laptrinhjavaweb.repository;


import java.util.List;

public interface BuildingRepository {
    void deleteByIdIn(List<Long> buildingIds);

    Long countByIdIn(List<Long> buildingIds);
}

//extends JpaRepository<BuildingEntity, Long>