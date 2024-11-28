package com.travelbe.service.account.user;

import com.travelbe.controller.pub.auth.models.Email;
import com.travelbe.controller.pub.auth.models.ForgotPasswordForm;
import com.travelbe.controller.pub.auth.models.LoginForm;
import com.travelbe.controller.pub.auth.models.RefreshToken;
import com.travelbe.controller.pub.auth.models.RegisterForm;
import com.travelbe.controller.pub.auth.models.TokenResponse;
import com.travelbe.controller.pub.residence.models.ResidenceBanner;
import com.travelbe.controller.user_me.models.*;
import com.travelbe.controller.user_me.models.booking.BookingRequest;
import com.travelbe.controller.user_me.models.booking.BookingResponse;
import com.travelbe.model.PageRequestCustom;
import com.travelbe.model.PageResponseCustom;
import com.travelbe.service.account.favorites.FavoritesService;
import com.travelbe.service.hotel.review.ReviewService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    @NonNull final UserCommandService userCommandService;
    @NonNull final UserQueryService userQueryService;
    @NonNull final FavoritesService favoritesService;
    @NonNull final ReviewService reviewService;

    public TokenResponse login(LoginForm loginForm) {
        return userQueryService.login(loginForm);
    }

    public void register(RegisterForm registerForm) {
        userCommandService.register(registerForm);
    }

    public TokenResponse refreshToken(RefreshToken refreshToken) {
        return userQueryService.refreshToken(refreshToken);
    }

    public void getCode(Email email) {
        userQueryService.getCode(email);
    }

    public void forgotPassword(ForgotPasswordForm forgotPasswordForm) {
        userCommandService.forgotPassword(forgotPasswordForm);
    }

    public UserResponse infoMe() {
        return userQueryService.infoMe();
    }

    public void updateMe(UserUpdate user) {
        userCommandService.updateMe(user);
    }

    public void changePassword(UpdatePassword password) {
        userCommandService.changePassword(password);
    }

    @Transactional
    public void booking(BookingRequest booking) {
        userCommandService.booking(booking);
    }

    public DropdownMe hasPermission() {
        return userQueryService.hasPermission();
    }

    public PageResponseCustom<BookingResponse> getBooking(PageRequestCustom pageRequestCustom) {
        return userQueryService.getBooking(pageRequestCustom);
    }

    public PageResponseCustom<ResidenceBanner> getFavorites(PageRequestCustom pageRequestCustom) {
        return favoritesService.getFavorites(pageRequestCustom);
    }

    public void updateFavorites(Integer residenceId) {
        favoritesService.updateFavorites(residenceId);
    }

    public void review(RatingModel rating) {
        reviewService.review(rating);
    }

    public byte[] bookingExport(Integer bookingId) {
        return userQueryService.bookingExport(bookingId);
    }
}
