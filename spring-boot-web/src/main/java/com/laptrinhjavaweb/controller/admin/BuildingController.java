package com.laptrinhjavaweb.controller.admin;

import com.laptrinhjavaweb.constant.SystemConstant;
import com.laptrinhjavaweb.dto.BuildingDTO;
import com.laptrinhjavaweb.service.IBuildingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.ModelAndView;

@Controller(value = "buildingsControllerOfAdmin")
public class BuildingController {
    @Autowired
    private IBuildingService buildingService;

    @GetMapping(value = "/admin/building-new")
    public ModelAndView createBuilding(@ModelAttribute(SystemConstant.MODEL) BuildingDTO model) {
        ModelAndView mav = new ModelAndView("admin/building/building_form");

        mav.addObject("valueBtn", "Thêm");

        return mav;
    }

    @GetMapping(value = "/admin/building-edit-{id}")
    public ModelAndView updateBuilding(@PathVariable("id") Long buildingId) {
        ModelAndView mav = new ModelAndView("admin/building/building_form");

        mav.addObject("valueBtn", "Chỉnh sửa");
        mav.addObject(SystemConstant.MODEL, buildingService.getBuildingById(buildingId));

        return mav;
    }
}
