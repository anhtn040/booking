package com.travelbe.controller.residence.models;

import com.travelbe.model.enums.EGender;
import com.travelbe.model.enums.EStatus;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

public record HumanResponse(
        Integer userId,
        String avatar,
        String name,
        String email,
        @Enumerated(EnumType.STRING)
        EGender gender,
        @Enumerated(EnumType.STRING)
        EStatus status
) {}
