package com.travelbe.dto.hotel.booking_detail;

public record BookingDetail(
        Integer index,
        Integer bookingId,
        Integer roomTypeId,
        String name,
        String price,
        Integer quantity,
        String total
){}
