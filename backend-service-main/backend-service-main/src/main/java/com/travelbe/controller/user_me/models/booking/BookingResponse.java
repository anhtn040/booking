package com.travelbe.controller.user_me.models.booking;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.travelbe.model.enums.EBookingStatus;
import lombok.Builder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Builder
public record BookingResponse(
        Integer bookingId,
        String avatar,
        Integer residenceId,
        String residenceName,
        String residencePhone,
        String address,
        String customerName,
        String customerPhone,
        @JsonFormat(pattern = "yyyy-MM-dd")
        LocalDate checkin,
        @JsonFormat(pattern = "yyyy-MM-dd")
        LocalDate checkout,
        Double total,
        Boolean paid,
        EBookingStatus status,
        Integer rating,
        String comment,
        String note,
        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
        LocalDateTime createdAt,
        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
        LocalDateTime updatedAt,
        List<BookingDetailResponse> rooms
) {

        public BookingResponse updateRooms(Double total, List<BookingDetailResponse> rooms) {
                return BookingResponse.builder()
                                        .bookingId(bookingId)
                                        .avatar(avatar)
                                        .residenceId(residenceId)
                                        .residenceName(residenceName)
                                        .residencePhone(residencePhone)
                                        .address(address)
                                        .customerName(customerName)
                                        .customerPhone(customerPhone)
                                        .checkin(checkin)
                                        .checkout(checkout)
                                        .total(total)
                                        .paid(paid)
                                        .status(status)
                                        .rating(rating)
                                        .comment(comment)
                                        .note(note)
                                        .createdAt(createdAt)
                                        .updatedAt(updatedAt)
                                        .rooms(rooms)
                                        .build();
        }
}
