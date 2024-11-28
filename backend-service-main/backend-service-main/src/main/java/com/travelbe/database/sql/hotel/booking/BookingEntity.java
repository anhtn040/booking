package com.travelbe.database.sql.hotel.booking;

import com.travelbe.model.enums.EBookingStatus;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "booking")
public class BookingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer bookingId;
    private Integer userId;
    private Integer residenceId;
    private Integer profitId;
    private String name;
    private String phone;
    private LocalDate checkin;
    private LocalDate checkout;
    private Boolean paid = false;
    @Enumerated(EnumType.STRING)
    private EBookingStatus status = EBookingStatus.PENDING;
    private Boolean reviewed = false;
    private String note;
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();

    public static BookingEntity changeStatus(BookingEntity entity) {
        switch (entity.status) {
            case PENDING -> entity.setStatus(EBookingStatus.CONFIRMED);
            case CONFIRMED, PAID -> entity.setStatus(EBookingStatus.EXPERIENCING);
            case EXPERIENCING -> entity.setStatus(EBookingStatus.COMPLETED);
        }
        return entity;
    }

    public static BookingEntity cancelBooking(BookingEntity entity) {
        entity.setStatus(EBookingStatus.CANCELED);
        return entity;
    }
}
