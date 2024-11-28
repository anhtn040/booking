package com.travelbe.controller.pub.files;

import com.travelbe.service.adds.image.ImageService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
public class ImageController implements ImageAPI {

    @NonNull final ImageService imageService;

    @Override
    public String uploadAnImage(MultipartFile image) {
        return imageService.uploadAnImage(image);
    }

}
