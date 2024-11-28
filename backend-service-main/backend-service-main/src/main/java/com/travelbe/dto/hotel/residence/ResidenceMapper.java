package com.travelbe.dto.hotel.residence;

import com.travelbe.controller.pub.residence.models.ResidenceBanner;
import com.travelbe.controller.pub.residence.models.ResidenceInfo;
import com.travelbe.database.sql.hotel.residence.ResidenceEntity;
import com.travelbe.database.sql.hotel.residence_amenities.ResidenceAmenitiesEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ResidenceMapper {

    ResidenceBanner toDto(ResidenceEntity entity, Integer roomQuantity);

    List<ResidenceBanner> toDto(List<ResidenceEntity> entities);
    @Mapping(source = "entity.facilities", target = "facilities", ignore = true)
    ResidenceInfo toDto(ResidenceEntity entity, List<ResidenceAmenitiesEntity> facilities);
}
