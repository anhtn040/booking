package com.travelbe.model;

import lombok.Builder;

import java.util.List;

@Builder
public record TokenValue(
        Integer userId,
        List<String> permissions,
        Long iat,
        Long exp
) {}
