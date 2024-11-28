package com.travelbe.controller.user_me.models;

import com.travelbe.model.enums.EGender;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotEmpty;

public record UserUpdate(
        @NotEmpty(message = "Tên không bỏ trống") String fullname,
        @Enumerated(EnumType.STRING)
        EGender gender,
        String avatar
) {}
