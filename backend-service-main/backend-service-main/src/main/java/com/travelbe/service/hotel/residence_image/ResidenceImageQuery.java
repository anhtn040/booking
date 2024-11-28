package com.travelbe.service.hotel.residence_image;

import com.travelbe.database.sql.hotel.residence_image.ResidenceImageEntity;
import com.travelbe.database.sql.hotel.residence_image.ResidenceImageRepository;
import com.travelbe.util.AuthenticationCurrent;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ResidenceImageQuery {

    @NonNull final ResidenceImageRepository residenceImageRepository;
    @NonNull final AuthenticationCurrent authCurrent;

    public List<String> imagesResidence(Integer residenceId) {
        return residenceImageRepository.findUrlByResidenceId(residenceId);
    }

    public List<String> allImagesResidence(Integer residenceId) {
        return residenceImageRepository.findAllImages(residenceId);
    }

    public List<ResidenceImageEntity> imageResidencePartner() {
        return residenceImageRepository.findAllByUserId(authCurrent.getUser().getUserId());
    }
}
