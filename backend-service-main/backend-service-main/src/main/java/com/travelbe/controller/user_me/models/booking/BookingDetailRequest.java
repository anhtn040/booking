package com.travelbe.controller.user_me.models.booking;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record BookingDetailRequest(
        @NotNull Integer roomTypeId,
        @Min(value = 1, message = "Số lượng tối thiểu là 1") Integer quantity
) {}
