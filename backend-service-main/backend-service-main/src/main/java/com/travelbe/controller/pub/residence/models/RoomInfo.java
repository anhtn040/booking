package com.travelbe.controller.pub.residence.models;

import com.travelbe.database.sql.hotel.room_type_image.RoomTypeImageEntity;
import lombok.Builder;

import java.util.List;

@Builder
public record RoomInfo(
        Integer roomTypeId,
        String name,
        Integer beds,
        Integer area,
        Integer quantity,
        Double price,
        List<String> images
) {

    public RoomInfo addImages(List<RoomTypeImageEntity> images) {
        return RoomInfo.builder()
                        .roomTypeId(roomTypeId)
                        .name(name)
                        .beds(beds)
                        .area(area)
                        .quantity(quantity)
                        .price(price)
                        .images(images.stream().map(RoomTypeImageEntity::getUrl).toList())
                        .build();
    }

    public RoomInfo updateQuantity(Integer quantity) {
        return RoomInfo.builder()
                .roomTypeId(roomTypeId)
                .name(name)
                .beds(beds)
                .area(area)
                .quantity(quantity)
                .price(price)
                .images(images)
                .build();
    }
}
