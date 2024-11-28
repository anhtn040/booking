package com.travelbe.model;

import java.time.LocalDate;
import java.util.Objects;

public record DateRange(
        LocalDate checkin,
        LocalDate checkout
) {

    public Boolean isNonNull() {
        return Objects.nonNull(checkin) || Objects.nonNull(checkout);
    }
}
