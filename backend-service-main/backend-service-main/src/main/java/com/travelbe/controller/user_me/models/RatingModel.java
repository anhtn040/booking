package com.travelbe.controller.user_me.models;

import jakarta.validation.constraints.NotNull;
import lombok.NonNull;

public record RatingModel(
        @NonNull Integer bookingId,
        @NotNull Integer rating,
        @NonNull String comment
) {}
