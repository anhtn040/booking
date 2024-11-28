package com.travelbe.controller.pub.residence.models;

import com.travelbe.database.sql.hotel.residence.ResidenceEntity;
import com.travelbe.dto.hotel.residence.ResidenceMapper;

import java.util.List;

public record ResidenceBanner(
        Integer residenceId,
        String name,
        String address,
        String type,
        Integer roomQuantity,
        Double priceMin,
        Double rating,
        Integer reviews,
        String avatar
) {
    public static List<ResidenceBanner> of(ResidenceMapper residenceMapper, List<Object[]> residenceObject) {
        return residenceObject.stream()
                .map(data -> residenceMapper.toDto((ResidenceEntity) data[0], (int) (long) data[1]))
                .toList();
    }
}