package com.laptrinhjavaweb.service;

import com.laptrinhjavaweb.dto.BuildingDTO;

import java.util.List;

public interface IBuildingService {

    BuildingDTO save(BuildingDTO building);

    BuildingDTO getBuildingById(Long buildingId);

    void delete(List<Long> buildingIds);
}
