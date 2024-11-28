package com.travelbe.controller.user_me.models.booking;

import lombok.Builder;

@Builder
public record BookingDetailResponse(
        Integer bookingId,
        Integer roomTypeId,
        String name,
        Double price,
        Integer quantity
) {}
