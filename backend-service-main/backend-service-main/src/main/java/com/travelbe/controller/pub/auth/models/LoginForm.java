package com.travelbe.controller.pub.auth.models;

import jakarta.validation.constraints.NotBlank;

public record LoginForm(
        @NotBlank String email,
        @NotBlank String password
) {}
