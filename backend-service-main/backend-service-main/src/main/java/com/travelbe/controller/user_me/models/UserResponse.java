package com.travelbe.controller.user_me.models;

import com.travelbe.model.enums.EGender;

public record UserResponse(
        String email,
        String fullname,
        EGender gender,
        String avatar
) {}
