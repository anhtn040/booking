package com.travelbe.service.adds.image;

import com.travelbe.config.exception.RequestInvalidException;
import com.travelbe.util.Const;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ImageQueryService {

    public String uploadAnImage(MultipartFile file) {
        try {
            byte[] bytes = file.getBytes();
            String[] names = file.getOriginalFilename().split("\\.");
            String uuid = String.valueOf(UUID.randomUUID());
            String filePath = String.format("%s/%s.%s", Const.LINK_FILE, uuid, names[names.length-1]);
            Path path = Paths.get(filePath);
            Files.write(path, bytes);
            return String.format("%s/%s.%s", Const.HOST_CDN, uuid, names[names.length-1]);
        } catch (Exception e) {
            throw new RequestInvalidException();
        }
    }

    public void uploadMultipleImages(MultipartFile multipartFile) {
    }
}
