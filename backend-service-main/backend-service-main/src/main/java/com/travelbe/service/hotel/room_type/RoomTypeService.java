package com.travelbe.service.hotel.room_type;

import com.travelbe.controller.pub.residence.models.RoomInfo;
import com.travelbe.controller.residence.models.RoomTypePartner;
import com.travelbe.controller.residence.models.UpdateImageRoom;
import com.travelbe.database.sql.hotel.room_type_image.RoomTypeImageEntity;
import com.travelbe.dto.hotel.room_type.RoomType;
import com.travelbe.model.DateRange;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomTypeService {

    @NonNull final RoomTypeQueryService roomTypeQueryService;
    @NonNull final RoomTypeCommandService roomTypeCommandService;

    public List<RoomInfo> roomsResidence(Integer residenceId, DateRange dateRange) {
        return roomTypeQueryService.roomsResidence(residenceId, dateRange);
    }

    public List<RoomType> getRoomTypePartner() {
        return roomTypeQueryService.roomTypePartner();
    }

    public void changeStatus(Integer roomId) {
        roomTypeCommandService.changeStatus(roomId);
    }

    public void changeImage(RoomTypeImageEntity updateImageRoom) {
        roomTypeCommandService.changeImage(updateImageRoom);
    }
}
