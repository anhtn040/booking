package com.travelbe.service.hotel.room_type;

import com.travelbe.config.exception.ResourceNotFoundException;
import com.travelbe.controller.residence.models.UpdateImageRoom;
import com.travelbe.database.sql.hotel.room_type.RoomTypeEntity;
import com.travelbe.database.sql.hotel.room_type.RoomTypeRepository;
import com.travelbe.database.sql.hotel.room_type_image.RoomTypeImageEntity;
import com.travelbe.database.sql.hotel.room_type_image.RoomTypeImageRepository;
import com.travelbe.model.enums.EStatus;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoomTypeCommandService {

    @NonNull final RoomTypeRepository roomTypeRepository;
    @NonNull final RoomTypeImageRepository roomTypeImageRepository;

    public void changeStatus(Integer roomId) {
        Optional<RoomTypeEntity> foundRoom = roomTypeRepository.findByRoomTypeId(roomId);
        if(foundRoom.isEmpty()) throw new ResourceNotFoundException("Phòng không tồn tại.");
        if(foundRoom.get().getStatus().equals(EStatus.ACTIVE)) {
            foundRoom.get().setStatus(EStatus.BLOCK);
        } else {
            foundRoom.get().setStatus(EStatus.ACTIVE);
        }
        roomTypeRepository.save(foundRoom.get());
    }

    public void changeImage(Integer roomId, List<String> images) {
        roomTypeImageRepository.deleteAllByRoomTypeId(roomId);
        roomTypeImageRepository.saveAll(
                images.stream()
                      .map(url -> RoomTypeImageEntity.builder()
                                                     .roomTypeId(roomId)
                                                     .url(url)
                                                     .build())
                      .toList()
        );
    }

    public void changeImage(RoomTypeImageEntity updateImageRoom) {
        if(Objects.nonNull(updateImageRoom.getRoomTypeImageId())) {
            RoomTypeImageEntity rti = roomTypeImageRepository.findById(updateImageRoom.getRoomTypeImageId())
                    .orElseThrow(ResourceNotFoundException::new);
            rti.setUrl(updateImageRoom.getUrl());
            roomTypeImageRepository.save(rti);
            return;
        }
        roomTypeImageRepository.save(updateImageRoom);
    }
}
