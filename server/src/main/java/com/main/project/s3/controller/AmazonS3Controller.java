package com.main.project.s3.controller;

import com.main.project.s3.service.AwsS3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/s3")
public class AmazonS3Controller {
    /**
     * Controller는 이미지 처리 잘 되는지 확인하는 용도임
     * 실제 상황에서는 productService에 AwsS3Service DI 후 uploadImage, deleteImage, getImage 사용
     * */
    private final AwsS3Service awsS3Service;

    /**
     * Amazon S3에 이미지 업로드
     */
    @PostMapping("/image")
    public ResponseEntity<List<String>> uploadImage(@RequestPart List<MultipartFile> multipartFile) {
        return ResponseEntity.status(HttpStatus.OK).body(awsS3Service.uploadImage(multipartFile));
    }

    /**
     * Amazon S3에 이미지 업로드 된 파일을 삭제
     */
    @DeleteMapping("/image")
    public ResponseEntity<Void> deleteImage(@RequestParam String fileName) {
        awsS3Service.deleteImage(fileName);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

}
