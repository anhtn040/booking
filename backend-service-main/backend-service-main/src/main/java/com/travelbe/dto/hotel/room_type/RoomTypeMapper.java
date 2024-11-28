package com.travelbe.dto.hotel.room_type;

import com.travelbe.controller.pub.residence.models.RoomInfo;
import com.travelbe.database.sql.hotel.room_type.RoomTypeEntity;
import com.travelbe.database.sql.hotel.room_type_image.RoomTypeImageEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RoomTypeMapper {

    @Mapping(source = "quantity", target = "quantity")
    RoomInfo toDto(RoomTypeEntity entity, Integer quantity);

    RoomType toDto(RoomTypeEntity room, List<RoomTypeImageEntity> images);
}
