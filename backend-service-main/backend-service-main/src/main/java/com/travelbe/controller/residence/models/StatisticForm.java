package com.travelbe.controller.residence.models;

import com.travelbe.model.enums.EBookingStatus;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.Objects;

public record StatisticForm(
        @NotNull(message = "Vui lòng chọn ngày bắt đầu.") LocalDate start,
        @NotNull(message = "Vui lòng chọn ngày kết thúc") LocalDate end,
        EBookingStatus status
) {

    public boolean hasStatus() {
        return Objects.nonNull(status);
    }
}
