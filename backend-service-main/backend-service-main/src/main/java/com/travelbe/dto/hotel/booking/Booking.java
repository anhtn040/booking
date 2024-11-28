package com.travelbe.dto.hotel.booking;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.travelbe.model.enums.EBookingStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Data
public class Booking {
        Integer bookingId;
        Integer residenceId;
        String residenceName;
        String residencePhone;
        String residenceOwner;
        String address;
        String customerName;
        String customerPhone;
        String email;
        String timeCheckin;
        String timeCheckout;
        @JsonFormat(pattern = "yyyy-MM-dd")
        LocalDate checkin;
        @JsonFormat(pattern = "yyyy-MM-dd")
        LocalDate checkout;
        String total;
        Boolean paid;
        EBookingStatus status;
        Integer rating;
        String comment;
        String note;
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
        LocalDate createdAt;
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
        LocalDateTime updatedAt;
}
