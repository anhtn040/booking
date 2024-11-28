package com.travelbe.service.hotel.room_type;

import com.travelbe.controller.pub.residence.models.RoomInfo;
import com.travelbe.database.sql.hotel.room_type.RoomTypeEntity;
import com.travelbe.database.sql.hotel.room_type.RoomTypeRepository;
import com.travelbe.database.sql.hotel.room_type_image.RoomTypeImageEntity;
import com.travelbe.database.sql.hotel.room_type_image.RoomTypeImageRepository;
import com.travelbe.dto.hotel.room_type.RoomType;
import com.travelbe.dto.hotel.room_type.RoomTypeMapper;
import com.travelbe.model.DateRange;
import com.travelbe.util.AuthenticationCurrent;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoomTypeQueryService {

    @NonNull final RoomTypeRepository roomTypeRepository;
    @NonNull final RoomTypeImageRepository roomTypeImageRepository;
    @NonNull final AuthenticationCurrent authCurrent;
    @NonNull final RoomTypeMapper roomTypeMapper;

    public List<RoomInfo> roomsResidence(Integer residenceId, DateRange dateRange) {
        List<RoomInfo> foundRooms = roomTypeRepository.findAllByResidenceId(residenceId, dateRange)
                .stream().map(d -> roomTypeMapper.toDto((RoomTypeEntity) d[0],(int) d[1]))
                .collect(Collectors.toList());
        roomTypeImageRepository.findAllByResidenceId(residenceId)
                .stream().collect(Collectors.groupingBy(RoomTypeImageEntity::getRoomTypeId))
                .forEach((key, value) -> {
                    for (int i = 0; i < foundRooms.size(); i++) {
                        if (key.equals(foundRooms.get(i).roomTypeId())) {
                            foundRooms.set(i, foundRooms.get(i).addImages(value));
                        }
                    }
                });
        return foundRooms;
    }

    public List<RoomType> roomTypePartner() {
        List<RoomTypeEntity> rooms = roomTypeRepository.findAllByUserId(authCurrent.getUser().getUserId());
        List<RoomTypeImageEntity> images = roomTypeImageRepository
                .findAllByRoomTypeIdIn(rooms.stream().map(RoomTypeEntity::getRoomTypeId).toList());
        Map<Integer, List<RoomTypeImageEntity>> map = images.stream()
                .collect(Collectors.groupingBy(RoomTypeImageEntity::getRoomTypeId));
        return rooms.stream()
                    .map(room -> roomTypeMapper.toDto(room, map.computeIfAbsent(room.getRoomTypeId(), key -> new ArrayList<>())))
                    .toList();
    }
}
