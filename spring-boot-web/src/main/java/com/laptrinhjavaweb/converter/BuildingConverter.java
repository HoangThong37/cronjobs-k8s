package com.laptrinhjavaweb.converter;

import com.laptrinhjavaweb.dto.BuildingDTO;
import com.laptrinhjavaweb.entity.BuildingEntity;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BuildingConverter {

    @Autowired
    private ModelMapper modelMapper;

    public BuildingDTO convertToDto (BuildingEntity buildingEntity){
        return modelMapper.map(buildingEntity, BuildingDTO.class);
    }

    public BuildingEntity convertToEntity(BuildingDTO buildingDTO){
        return modelMapper.map(buildingDTO, BuildingEntity.class);
    }
}
