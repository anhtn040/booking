package com.travelbe.controller.pub.files;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RequestMapping("/v1/pub/images")
@Tag(name = "images", description = "API for images")
public interface ImageAPI {

    @PostMapping
    String uploadAnImage(@RequestParam MultipartFile image);
}
