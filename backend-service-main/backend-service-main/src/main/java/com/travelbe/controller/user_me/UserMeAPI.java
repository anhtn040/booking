package com.travelbe.controller.user_me;

import com.travelbe.controller.pub.residence.models.ResidenceBanner;
import com.travelbe.controller.user_me.models.*;
import com.travelbe.controller.user_me.models.booking.BookingRequest;
import com.travelbe.controller.user_me.models.booking.BookingResponse;
import com.travelbe.model.PageResponseCustom;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/v1/me")
@Tag(name = "me", description = "API for me")
public interface UserMeAPI {

    @PostMapping
    void checkToken();

    @GetMapping("/info")
    UserResponse infoMe();

    @GetMapping
    DropdownMe hasPermission();

    @PatchMapping("/update")
    void updateMe(@RequestBody @Valid UserUpdate user);

    @PatchMapping("/change-password")
    void changePassword(@RequestBody @Valid UpdatePassword password);

    @PostMapping("/booking")
    void booking(@Valid @RequestBody BookingRequest booking);

    @PostMapping("/booking/{bookingId}")
    ResponseEntity<byte[]> bookingExport(@PathVariable Integer bookingId);

    @GetMapping("/booking")
    PageResponseCustom<BookingResponse> getBooking(
            @RequestParam(required = false, value = "page", defaultValue = "1") Integer page,
            @RequestParam(required = false, value = "size", defaultValue = "8") Integer size);

    @PutMapping("/favorites/{residenceId}")
    void updateFavorites(@PathVariable Integer residenceId);
    @GetMapping("/favorites")
    PageResponseCustom<ResidenceBanner> getFavorites(
            @RequestParam(required = false, value = "page", defaultValue = "1") Integer page,
            @RequestParam(required = false, value = "size", defaultValue = "8") Integer size);

    @PutMapping ("/rating")
    void review(@RequestBody @Valid RatingModel rating);
}
