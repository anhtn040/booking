package com.travelbe.service.hotel.residence;

import com.travelbe.controller.pub.residence.models.AmenitiesCriteria;
import com.travelbe.controller.pub.residence.models.ResidenceBanner;
import com.travelbe.controller.pub.residence.models.ResidenceInfo;
import com.travelbe.database.sql.hotel.residence.ResidenceEntity;
import com.travelbe.model.DateRange;
import com.travelbe.model.PageRequestCustom;
import com.travelbe.model.PageResponseCustom;
import com.travelbe.model.PriceRange;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ResidenceService {

    @NotNull final ResidenceCommandService residenceCommandService;
    @NotNull final ResidenceQueryService residenceQueryService;

    public PageResponseCustom<ResidenceBanner> residences(DateRange dateRange, PriceRange priceRange,
                                                          AmenitiesCriteria amenitiesCriteria, PageRequestCustom pageRequestCustom) {
        return residenceQueryService.residences(dateRange, priceRange, amenitiesCriteria, pageRequestCustom);
    }

    public ResidenceInfo residenceInfo(Integer residenceId) {
        return residenceQueryService.residenceInfo(residenceId);
    }

    public ResidenceEntity getResidence() {
        return residenceQueryService.getResidencePartner();
    }
}
