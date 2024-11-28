package com.travelbe.controller.pub.auth.models;

public record Email(
        @jakarta.validation.constraints.Email String email
) {}
