package com.travelbe.dto.hotel.room_type;

import com.travelbe.database.sql.hotel.room_type_image.RoomTypeImageEntity;
import com.travelbe.model.enums.EStatus;

import java.util.List;

public record RoomType(
        Integer roomTypeId,
        Integer residenceId,
        String name,
        Integer beds,
        Integer area,
        Integer quantity,
        Double price,
        EStatus status,
        List<RoomTypeImageEntity> images
) {}
