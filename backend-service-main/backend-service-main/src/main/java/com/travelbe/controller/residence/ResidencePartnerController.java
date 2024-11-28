package com.travelbe.controller.residence;

import com.travelbe.controller.residence.models.RoomTypePartner;
import com.travelbe.controller.residence.models.UpdateImageRoom;
import com.travelbe.database.sql.hotel.residence.ResidenceEntity;
import com.travelbe.database.sql.hotel.residence_image.ResidenceImageEntity;
import com.travelbe.database.sql.hotel.room_type.RoomTypeEntity;
import com.travelbe.database.sql.hotel.room_type_image.RoomTypeImageEntity;
import com.travelbe.dto.hotel.room_type.RoomType;
import com.travelbe.service.hotel.residence.ResidenceService;
import com.travelbe.service.hotel.residence_image.ResidenceImageService;
import com.travelbe.service.hotel.room_type.RoomTypeService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ResidencePartnerController implements ResidencePartnerAPI {

    @NonNull final ResidenceService residenceService;
    @NonNull final ResidenceImageService residenceImageService;
    @NonNull final RoomTypeService roomTypeService;

    @Override
    public ResidenceEntity getResidence() {
        return residenceService.getResidence();
    }

    @Override
    public List<ResidenceImageEntity> getImages() {
        return residenceImageService.getImages();
    }

    @Override
    public List<RoomType> getRooms() {
        return roomTypeService.getRoomTypePartner();
    }

    @Override
    public void changeStatusRoom(Integer roomId) {
        roomTypeService.changeStatus(roomId);
    }

    @Override
    public void changeImageRoom(RoomTypeImageEntity updateImageRoom) {
        roomTypeService.changeImage(updateImageRoom);
    }
}
