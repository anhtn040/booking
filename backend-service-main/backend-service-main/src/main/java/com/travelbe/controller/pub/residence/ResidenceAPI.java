package com.travelbe.controller.pub.residence;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.travelbe.controller.pub.residence.models.ResidenceBanner;
import com.travelbe.controller.pub.residence.models.ResidenceInfo;
import com.travelbe.controller.pub.residence.models.RoomInfo;
import com.travelbe.database.sql.hotel.review.ReviewEntity;
import com.travelbe.model.PageResponseCustom;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.util.List;

@RequestMapping("/v1/pub/residences")
@Tag(name = "residences", description = "API for login page")
public interface ResidenceAPI {

    @GetMapping
    PageResponseCustom<ResidenceBanner> residences(
            @RequestParam(required = false, value = "checkin") @JsonFormat(pattern = "yyyy-MM-dd") LocalDate checkin,
            @RequestParam(required = false, value = "checkout") @JsonFormat(pattern = "yyyy-MM-dd") LocalDate checkout,
            @RequestParam(required = false, value = "priceMin", defaultValue = "0") Double priceMin,
            @RequestParam(required = false, value = "priceMax", defaultValue = "5000000") Double priceMax,

            @RequestParam(required = false, value = "hotel", defaultValue = "false") Boolean hotel,
            @RequestParam(required = false, value = "homestay", defaultValue = "false") Boolean homestay,
            @RequestParam(required = false, value = "villa", defaultValue = "false") Boolean villa,
            @RequestParam(required = false, value = "home", defaultValue = "false") Boolean home,

            @RequestParam(required = false, value = "bbq", defaultValue = "false") Boolean bbq,
            @RequestParam(required = false, value = "cook", defaultValue = "false") Boolean cook,
            @RequestParam(required = false, value = "notDeposit", defaultValue = "false") Boolean notDeposit,
            @RequestParam(required = false, value = "seeView", defaultValue = "false") Boolean seeView,
            @RequestParam(required = false, value = "receptionist", defaultValue = "false") Boolean receptionist,
            @RequestParam(required = false, value = "washing", defaultValue = "false") Boolean washing,

            @RequestParam(required = false, value = "pet", defaultValue = "false") Boolean pet,
            @RequestParam(required = false, value = "smoking", defaultValue = "false") Boolean smoking,

            @RequestParam(required = false, value = "page", defaultValue = "1") Integer page,
            @RequestParam(required = false, value = "size", defaultValue = "12") Integer size);

    @GetMapping("/{residenceId}/images")
    List<String> imagesResidence(@PathVariable Integer residenceId);

    @GetMapping("/{residenceId}")
    ResidenceInfo residenceInfo(@PathVariable Integer residenceId);

    @GetMapping("/{residenceId}/comments")
    PageResponseCustom<ReviewEntity> commentsResidence(
            @PathVariable Integer residenceId,
            @RequestParam(required = false, value = "page", defaultValue = "1") Integer page,
            @RequestParam(required = false, value = "size", defaultValue = "12") Integer size);

    @GetMapping("/{residenceId}/rooms")
    List<RoomInfo> roomsResidence(
            @PathVariable Integer residenceId,
            @Valid @NotNull @RequestParam(value = "checkin") @JsonFormat(pattern = "yyyy-MM-dd") LocalDate checkin,
            @Valid @NotNull @RequestParam(value = "checkout") @JsonFormat(pattern = "yyyy-MM-dd") LocalDate checkout);

    @GetMapping("/{residenceId}/images/all")
    List<String> allImagesResidence(@PathVariable Integer residenceId);
}
