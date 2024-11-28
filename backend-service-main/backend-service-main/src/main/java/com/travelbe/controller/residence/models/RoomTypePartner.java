package com.travelbe.controller.residence.models;

import com.travelbe.database.sql.hotel.room_type.RoomTypeEntity;
import com.travelbe.database.sql.hotel.room_type_image.RoomTypeImageEntity;

import java.util.List;

public record RoomTypePartner (
        RoomTypeEntity room,
        List<RoomTypeImageEntity> images
) {}
