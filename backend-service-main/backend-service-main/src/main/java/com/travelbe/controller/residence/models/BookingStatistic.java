package com.travelbe.controller.residence.models;

import java.util.List;

public record BookingStatistic(
        List<BookingStatisticDetail> booking,
        Double total
) {}
