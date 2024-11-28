package com.travelbe.dto.hotel.booking_detail;

import com.travelbe.controller.user_me.models.booking.BookingDetailResponse;
import com.travelbe.database.sql.hotel.booking_detail.BookingDetailEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.text.DecimalFormat;

@Mapper(componentModel = "spring")
public interface BookingDetailMapper {

    static final DecimalFormat decimalFormat = new DecimalFormat("#,###");

    BookingDetailResponse toDto(BookingDetailEntity entity, String name);

    @Mapping(target = "price", expression = "java(formatPrice(entity.getPrice()))")
    @Mapping(target = "total", expression = "java(formatTotal(entity.getPrice(), entity.getQuantity()))")
    BookingDetail toDto(BookingDetailEntity entity, String name, Integer index);

    default Double calculateTotal(Integer quantity, Double price) {
        return price * quantity;
    }

    default String formatPrice(Double price) {
        return decimalFormat.format(price);
    }

    default String formatTotal(Double price, Integer quantity) {
        return decimalFormat.format(price * quantity);
    }
}
