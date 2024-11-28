package com.travelbe.service.hotel.review;

import com.travelbe.database.sql.hotel.review.ReviewEntity;
import com.travelbe.database.sql.hotel.review.ReviewRepository;
import com.travelbe.model.PageRequestCustom;
import com.travelbe.model.PageResponseCustom;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReviewQueryService {

    @NonNull final ReviewRepository reviewRepository;
    public PageResponseCustom<ReviewEntity> reviewsResidence(Integer residenceId, PageRequestCustom pageRequest) {
        Page<ReviewEntity> foundReviews = reviewRepository.findByResidenceId(residenceId, pageRequest.pageRequest());
        return PageResponseCustom.<ReviewEntity>builder()
                                 .data(foundReviews.getContent())
                                 .totalPage(foundReviews.getTotalPages())
                                 .totalElement((int) foundReviews.getTotalElements())
                                 .currentPage(pageRequest.currentPage())
                                 .pageSize(pageRequest.pageSize())
                                 .build();
    }
}
