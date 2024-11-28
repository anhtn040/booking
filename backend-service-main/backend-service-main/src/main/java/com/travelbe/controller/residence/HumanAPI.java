package com.travelbe.controller.residence;

import com.travelbe.controller.residence.models.HumanRequest;
import com.travelbe.database.sql.account.user.UserEntity;
import com.travelbe.model.enums.EGender;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@RequestMapping("/v1/residence/human")
@Tag(name = "Human Residence", description = "API for Residence")
public interface HumanAPI {

    @GetMapping
    List<UserEntity> humanOfResidence(@RequestParam(required = false, defaultValue = "") String search);

    @PostMapping
    void createHuman(@Valid @RequestBody HumanRequest human);

    @PatchMapping("/{humanId}")
    void updateStatus(@PathVariable Integer humanId);

    @DeleteMapping("/{humanId}")
    void delete(@PathVariable Integer humanId);
}
