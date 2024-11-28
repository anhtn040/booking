package com.travelbe.service.adds.image;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class ImageService {

    @NonNull final ImageCommandService imageCommandService;
    @NonNull final ImageQueryService imageQueryService;

    public String uploadAnImage(MultipartFile multipartFile) {
        return imageQueryService.uploadAnImage(multipartFile);
    }

    public void uploadMultipleImages(MultipartFile multipartFile) {
        imageQueryService.uploadMultipleImages(multipartFile);
    }

}
