package com.travelbe.service.hotel.residence_image;

import com.travelbe.database.sql.hotel.residence_image.ResidenceImageEntity;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ResidenceImageService {

    @NonNull final ResidenceImageQuery residenceImageQuery;

    public List<String> imagesResidence(Integer residenceId) {
        return residenceImageQuery.imagesResidence(residenceId);
    }

    public List<String> allImagesResidence(Integer residenceId) {
        return residenceImageQuery.allImagesResidence(residenceId);
    }

    public List<ResidenceImageEntity> getImages() {
        return residenceImageQuery.imageResidencePartner();
    }
}
