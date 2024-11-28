package com.travelbe.controller.residence;

import com.travelbe.controller.residence.models.RoomTypePartner;
import com.travelbe.controller.residence.models.UpdateImageRoom;
import com.travelbe.database.sql.hotel.residence.ResidenceEntity;
import com.travelbe.database.sql.hotel.residence_image.ResidenceImageEntity;
import com.travelbe.database.sql.hotel.room_type.RoomTypeEntity;
import com.travelbe.database.sql.hotel.room_type_image.RoomTypeImageEntity;
import com.travelbe.dto.hotel.room_type.RoomType;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/v1/residence")
@Tag(name = "Management Residence", description = "API for Residence")
public interface ResidencePartnerAPI {

    @GetMapping
    ResidenceEntity getResidence();

//    @GetMapping("/{residenceId}/facilities")
//    Object getFacilities(@PathVariable Integer residenceId);

    @GetMapping("/images")
    List<ResidenceImageEntity> getImages();

    @GetMapping("/rooms")
    List<RoomType> getRooms();

    @PatchMapping("/room/{roomId}/change-status")
    void changeStatusRoom(@PathVariable Integer roomId);

    @PatchMapping("/change-image-room")
    void changeImageRoom(@RequestBody @Valid RoomTypeImageEntity updateImageRoom);
}
