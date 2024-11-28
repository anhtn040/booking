package com.travelbe.service.hotel.review;

import com.travelbe.controller.user_me.models.RatingModel;
import com.travelbe.database.sql.hotel.review.ReviewEntity;
import com.travelbe.model.PageRequestCustom;
import com.travelbe.model.PageResponseCustom;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ReviewService {

    @NonNull final ReviewQueryService reviewQueryService;
    @NonNull final ReviewCommandService reviewCommandService;

    public PageResponseCustom<ReviewEntity> reviewsResidence(Integer residenceId, PageRequestCustom pageRequest) {
        return reviewQueryService.reviewsResidence(residenceId, pageRequest);
    }

    @Transactional
    public void review(RatingModel rating) {
        reviewCommandService.review(rating);
    }
}
