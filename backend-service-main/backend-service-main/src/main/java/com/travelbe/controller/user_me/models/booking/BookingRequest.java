package com.travelbe.controller.user_me.models.booking;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.List;

public record BookingRequest(
        @NotNull Integer residenceId,
        @NotEmpty(message = "Tên không bỏ trống") String name,
        @NotBlank(message = "CMND/CCCD không hợp lệ") String identifyId,
        @Email(message = "Email không hợp lệ") String email,
        @NotBlank(message = "Số điện thoại không đúng") String phone,
        String note,
        @NotNull LocalDate checkin,
        @NotNull LocalDate checkout,
        @NotNull List<BookingDetailRequest> bookingDetail
) {}
