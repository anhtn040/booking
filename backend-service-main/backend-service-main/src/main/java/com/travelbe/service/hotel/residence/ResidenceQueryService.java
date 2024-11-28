package com.travelbe.service.hotel.residence;

import com.travelbe.config.exception.ResourceNotFoundException;
import com.travelbe.controller.pub.residence.models.AmenitiesCriteria;
import com.travelbe.controller.pub.residence.models.ResidenceBanner;
import com.travelbe.controller.pub.residence.models.ResidenceInfo;
import com.travelbe.database.sql.hotel.residence.ResidenceEntity;
import com.travelbe.database.sql.hotel.residence.ResidenceRepository;
import com.travelbe.database.sql.hotel.residence_amenities.ResidenceAmenitiesRepository;
import com.travelbe.dto.hotel.residence.ResidenceMapper;
import com.travelbe.model.DateRange;
import com.travelbe.model.PageRequestCustom;
import com.travelbe.model.PageResponseCustom;
import com.travelbe.model.PriceRange;
import com.travelbe.model.enums.EStatus;
import com.travelbe.util.AuthenticationCurrent;
import jakarta.validation.constraints.NotNull;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ResidenceQueryService {

    @NotNull final ResidenceRepository residenceRepository;
    @NotNull final ResidenceMapper residenceMapper;
    @NotNull final ResidenceAmenitiesRepository residenceAmenitiesRepository;
    @NonNull final AuthenticationCurrent authCurrent;

    public PageResponseCustom<ResidenceBanner> residences(DateRange dateRange, PriceRange priceRange,
                                                          AmenitiesCriteria amenitiesCriteria,
                                                          PageRequestCustom pageRequestCustom) {

        Page<Object[]> foundResidence = residenceRepository
                .getAllResidences(dateRange, priceRange, amenitiesCriteria, pageRequestCustom.pageRequest());
        return PageResponseCustom.<ResidenceBanner>builder()
                                 .data(ResidenceBanner.of(residenceMapper, foundResidence.getContent()))
                                 .totalPage(foundResidence.getTotalPages())
                                 .totalElement((int) foundResidence.getTotalElements())
                                 .currentPage(pageRequestCustom.currentPage())
                                 .pageSize(pageRequestCustom.pageSize())
                                 .build();
    }

    public ResidenceInfo residenceInfo(Integer residenceId) {
        ResidenceEntity foundResidence = residenceRepository.findByResidenceIdAndStatus(residenceId, EStatus.ACTIVE)
                .orElseThrow(ResourceNotFoundException::new);
        return ResidenceInfo.of(foundResidence, residenceAmenitiesRepository.findAllByResidenceId(residenceId));
    }

    public ResidenceEntity getResidencePartner() {
       return residenceRepository.findByUserIdJoin(authCurrent.getUser().getUserId())
               .orElseThrow(ResourceNotFoundException::new);
    }
}
