package com.travelbe.controller.pub.auth.models;

import jakarta.validation.constraints.NotBlank;

public record RefreshToken(
        @NotBlank String refreshToken
) {}
