package com.travelbe.dto.hotel.booking;

import com.travelbe.controller.residence.models.BookingStatisticDetail;
import com.travelbe.controller.user_me.models.booking.BookingResponse;
import com.travelbe.database.sql.account.user.UserEntity;
import com.travelbe.database.sql.hotel.booking.BookingEntity;
import com.travelbe.database.sql.hotel.residence.ResidenceEntity;
import com.travelbe.database.sql.hotel.review.ReviewEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.text.DecimalFormat;
import java.util.List;

@Mapper(componentModel = "spring")
public interface BookingMapper {

    static final DecimalFormat decimalFormat = new DecimalFormat("#,###");

    @Mapping(source = "bd.bookingId", target = "bookingId")
    @Mapping(source = "bd.residenceId", target = "residenceId")
    @Mapping(source = "re.avatar", target = "avatar")
    @Mapping(source = "bd.name", target = "customerName")
    @Mapping(source = "bd.phone", target = "residencePhone")
    @Mapping(source = "re.phone", target = "customerPhone")
    @Mapping(source = "re.name", target = "residenceName")
    @Mapping(source = "bd.checkin", target = "checkin")
    @Mapping(source = "bd.checkout", target = "checkout")
    @Mapping(source = "bd.status", target = "status")
    @Mapping(source = "rv.rating", target = "rating")
    @Mapping(source = "rv.comment", target = "comment")
    @Mapping(source = "bd.createdAt", target = "createdAt")
    @Mapping(source = "bd.updatedAt", target = "updatedAt")
    BookingResponse toDto(BookingEntity bd, ResidenceEntity re, ReviewEntity rv);

    List<com.travelbe.controller.residence.models.BookingResponse> toDto(List<BookingEntity> entity);
    BookingStatisticDetail toDto(BookingEntity entity, Double total, Integer roomQuantity);

    @Mapping(source = "residence.residenceId", target = "residenceId")
    @Mapping(source = "residence.name", target = "residenceName")
    @Mapping(source = "residence.fullname", target = "residenceOwner")
    @Mapping(source = "residence.phone", target = "residencePhone")
    @Mapping(source = "residence.checkin", target = "timeCheckin")
    @Mapping(source = "residence.checkout", target = "timeCheckout")
    @Mapping(source = "booking.name", target = "customerName")
    @Mapping(source = "booking.phone", target = "customerPhone")
    @Mapping(source = "booking.checkin", target = "checkin")
    @Mapping(source = "booking.checkout", target = "checkout")
    @Mapping(source = "booking.status", target = "status")
    @Mapping(source = "user.email", target = "email")
    @Mapping(target = "total", expression = "java(totalFormat(total))")
    Booking toDto(BookingEntity booking, ResidenceEntity residence, UserEntity user, Double total);

    default String totalFormat(Double total) {
        return decimalFormat.format(total);
    }
}