package com.travelbe.controller.residence.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.travelbe.model.enums.EBookingStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record BookingResponse(
        Integer bookingId,
        String phone,
        String name,
        @JsonFormat(pattern = "yyyy-MM-dd")
        LocalDate checkin,
        @JsonFormat(pattern = "yyyy-MM-dd")
        LocalDate checkout,
        Boolean paid,
        EBookingStatus status,
        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
        LocalDateTime createdAt
) {}
