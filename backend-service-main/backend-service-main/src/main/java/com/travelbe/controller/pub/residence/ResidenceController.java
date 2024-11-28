package com.travelbe.controller.pub.residence;

import com.travelbe.controller.pub.residence.models.AmenitiesCriteria;
import com.travelbe.controller.pub.residence.models.ResidenceBanner;
import com.travelbe.controller.pub.residence.models.ResidenceInfo;
import com.travelbe.controller.pub.residence.models.RoomInfo;
import com.travelbe.database.sql.hotel.review.ReviewEntity;
import com.travelbe.model.DateRange;
import com.travelbe.model.PageRequestCustom;
import com.travelbe.model.PageResponseCustom;
import com.travelbe.model.PriceRange;
import com.travelbe.service.hotel.residence.ResidenceService;
import com.travelbe.service.hotel.residence_image.ResidenceImageService;
import com.travelbe.service.hotel.review.ReviewService;
import com.travelbe.service.hotel.room_type.RoomTypeService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class ResidenceController implements ResidenceAPI {

    @NonNull final ResidenceService residenceService;
    @NonNull final ReviewService reviewService;
    @NonNull final RoomTypeService roomTypeService;
    @NonNull final ResidenceImageService residenceImageService;

    @Override
    public PageResponseCustom<ResidenceBanner> residences(LocalDate checkin, LocalDate checkout, Double priceMin,
                                                          Double priceMax, Boolean hotel, Boolean homestay,
                                                          Boolean villa, Boolean home, Boolean bbq, Boolean cook,
                                                          Boolean notDeposit, Boolean seeView, Boolean receptionist,
                                                          Boolean washing, Boolean pet, Boolean smoking,
                                                          Integer page, Integer size) {
        PageRequestCustom pageRequestCustom = PageRequestCustom.of(page, size);
        PriceRange priceRange = new PriceRange(priceMin, priceMax);
        DateRange dateRange = new DateRange(checkin, checkout);

        AmenitiesCriteria amenitiesCriteria = AmenitiesCriteria.builder()
                .hotel(hotel).homestay(homestay).villa(villa).home(home)
                .bbq(bbq).cook(cook).notDeposit(notDeposit).seeView(seeView)
                .receptionist(receptionist).washing(washing).pet(pet).smoking(smoking)
                .build();
        return residenceService.residences(dateRange, priceRange, amenitiesCriteria, pageRequestCustom);
    }

    @Override
    public List<String> imagesResidence(Integer residenceId) {
        return residenceImageService.imagesResidence(residenceId);
    }

    @Override
    public ResidenceInfo residenceInfo(Integer residenceId) {
        return residenceService.residenceInfo(residenceId);
    }

    @Override
    public PageResponseCustom<ReviewEntity> commentsResidence(Integer residenceId, Integer page, Integer size) {
        PageRequestCustom pageRequest = PageRequestCustom.of(page, size);
        return reviewService.reviewsResidence(residenceId, pageRequest);
    }

    @Override
    public List<RoomInfo> roomsResidence(Integer residenceId, LocalDate checkin, LocalDate checkout) {
        DateRange dateRange = new DateRange(checkin, checkout);
        return roomTypeService.roomsResidence(residenceId, dateRange);
    }

    @Override
    public List<String> allImagesResidence(Integer residenceId) {
        return residenceImageService.allImagesResidence(residenceId);
    }
}
