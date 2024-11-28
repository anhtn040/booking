package com.travelbe.controller.pub.residence.models;

import com.travelbe.database.sql.hotel.amenities.AmenitiesEntity;
import com.travelbe.database.sql.hotel.residence.ResidenceEntity;
import com.travelbe.model.enums.EResidence;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Builder;

import java.util.List;

@Builder
public record ResidenceInfo(
        Integer residenceId,
        String name,
        String address,
        String description,
        Double lat,
        Double lon,
        String checkin,
        String checkout,
        Double rating,
        Integer reviews,
        @Enumerated(EnumType.STRING)
        EResidence type,
        List<AmenitiesEntity> facilities
) {
        public static ResidenceInfo of(ResidenceEntity entity, List<AmenitiesEntity> facilities) {
                return ResidenceInfo.builder()
                        .residenceId(entity.getResidenceId())
                        .name(entity.getName())
                        .address(entity.getAddress())
                        .description(entity.getDescription())
                        .lat(entity.getLat())
                        .lon(entity.getLon())
                        .checkin(entity.getCheckin())
                        .checkout(entity.getCheckout())
                        .rating(entity.getRating())
                        .reviews(entity.getReviews())
                        .type(entity.getType())
                        .facilities(facilities)
                        .build();
        }
}
