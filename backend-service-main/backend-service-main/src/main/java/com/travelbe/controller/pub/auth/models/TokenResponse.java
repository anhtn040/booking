package com.travelbe.controller.pub.auth.models;

import lombok.Builder;

@Builder
public record TokenResponse(
        String accessToken,
        String refreshToken
) {}
