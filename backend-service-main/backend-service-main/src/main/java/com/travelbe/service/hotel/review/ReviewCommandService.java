package com.travelbe.service.hotel.review;

import com.travelbe.config.exception.ResourceNotFoundException;
import com.travelbe.controller.user_me.models.RatingModel;
import com.travelbe.database.sql.account.user.UserEntity;
import com.travelbe.database.sql.hotel.booking.BookingEntity;
import com.travelbe.database.sql.hotel.booking.BookingRepository;
import com.travelbe.database.sql.hotel.residence.ResidenceEntity;
import com.travelbe.database.sql.hotel.residence.ResidenceRepository;
import com.travelbe.database.sql.hotel.review.ReviewEntity;
import com.travelbe.database.sql.hotel.review.ReviewRepository;
import com.travelbe.model.enums.EBookingStatus;
import com.travelbe.util.AuthenticationCurrent;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ReviewCommandService {

    @NonNull final ReviewRepository reviewRepository;
    @NonNull final BookingRepository bookingRepository;
    @NonNull final AuthenticationCurrent authCurrent;
    @NonNull final ResidenceRepository residenceRepository;

    public void review(RatingModel rating) {
        UserEntity currentUser = authCurrent.getUser();

        BookingEntity foundBooking = bookingRepository.findById(rating.bookingId())
                .orElseThrow(() -> new ResourceNotFoundException("Đơn không hợp lệ"));
        if(!foundBooking.getStatus().equals(EBookingStatus.COMPLETED)) {
            throw new ResourceNotFoundException("Đơn chưa hoàn thành, vui lòng sử dụng để đánh giá.");
        }
        if(!foundBooking.getUserId().equals(currentUser.getUserId())) {
            throw new ResourceNotFoundException("Bạn không sở hữ đơn đánh giá này.");
        }
        if(foundBooking.getReviewed()) {
            ReviewEntity foundReview = reviewRepository.findByBookingId(rating.bookingId())
                    .orElseThrow(() -> new ResourceNotFoundException("Đánh giá không hợp lệ"));
            foundReview.setComment(rating.comment());
            reviewRepository.save(foundReview);
        } else {
            ResidenceEntity foundResidence = residenceRepository.findByUserId(foundBooking.getResidenceId())
                            .orElseThrow(() -> new ResourceNotFoundException("Khách sạn không tồn tại."));
            double star = (foundResidence.getReviews()*foundResidence.getRating() + rating.rating())/(foundResidence.getReviews()+1);
            foundResidence.setReviews(foundResidence.getReviews() + 1);
            foundResidence.setRating(star);
            foundBooking.setReviewed(true);
            ReviewEntity newReview = ReviewEntity.builder()
                    .bookingId(foundBooking.getBookingId())
                    .residenceId(foundBooking.getResidenceId())
                    .name(currentUser.getFullname())
                    .avatar(currentUser.getAvatar())
                    .comment(rating.comment())
                    .rating(rating.rating())
                    .createdAt(LocalDateTime.now())
                    .build();
            reviewRepository.save(newReview);
            bookingRepository.save(foundBooking);
        }
    }
}