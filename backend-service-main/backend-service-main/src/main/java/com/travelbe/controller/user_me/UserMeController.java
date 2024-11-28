package com.travelbe.controller.user_me;

import com.travelbe.controller.pub.residence.models.ResidenceBanner;
import com.travelbe.controller.user_me.models.*;
import com.travelbe.controller.user_me.models.booking.BookingRequest;
import com.travelbe.controller.user_me.models.booking.BookingResponse;
import com.travelbe.model.PageRequestCustom;
import com.travelbe.model.PageResponseCustom;
import com.travelbe.service.account.user.UserService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserMeController implements UserMeAPI {

    @NonNull final UserService userService;

    @Override
    public void checkToken() {}

    @Override
    public UserResponse infoMe() {
        return userService.infoMe();
    }

    @Override
    public DropdownMe hasPermission() {
        return userService.hasPermission();
    }

    @Override
    public void updateMe(UserUpdate user) {
        userService.updateMe(user);
    }

    @Override
    public void changePassword(UpdatePassword password) {
        userService.changePassword(password);
    }

    @Override
    public void booking(BookingRequest booking) {
        userService.booking(booking);
    }

    @Override
    public ResponseEntity<byte[]> bookingExport(Integer bookingId) {
        byte[] bookingExport = userService.bookingExport(bookingId);
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=booking.pdf");
        headers.add(HttpHeaders.CONTENT_TYPE, "application/pdf");

        return ResponseEntity.ok()
                             .headers(headers)
                             .body(bookingExport);
    }

    @Override
    public PageResponseCustom<BookingResponse> getBooking(Integer page, Integer size) {
        PageRequestCustom pageRequestCustom = PageRequestCustom.of(page, size);
        return userService.getBooking(pageRequestCustom);
    }

    @Override
    public void updateFavorites(Integer residenceId) {
        userService.updateFavorites(residenceId);
    }

    @Override
    public PageResponseCustom<ResidenceBanner> getFavorites(Integer page, Integer size) {
        PageRequestCustom pageRequestCustom = PageRequestCustom.of(page, size);
        return userService.getFavorites(pageRequestCustom);
    }

    @Override
    public void review(RatingModel rating) {
        userService.review(rating);
    }
}
