package com.laptrinhjavaweb.api.admin;


import com.laptrinhjavaweb.dto.BuildingDTO;
import com.laptrinhjavaweb.service.IBuildingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("buildingAPIOfAdmin")
@RequestMapping("/api/building")
public class BuildingAPI {

    @Autowired
    private IBuildingService buildingService;

    @PostMapping
    public  ResponseEntity<BuildingDTO> saveBuilding(@RequestBody BuildingDTO building){
        ResponseEntity<BuildingDTO> response = ResponseEntity.ok(buildingService.save(building));

       // log.info("Building Form Response: {}", response);

        return response;
    }


}
