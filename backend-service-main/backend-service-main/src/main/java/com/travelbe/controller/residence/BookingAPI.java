package com.travelbe.controller.residence;

import com.travelbe.controller.residence.models.BookingResponse;
import com.travelbe.model.PageResponseCustom;
import com.travelbe.model.enums.EBookingStatus;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/v1/residence/booking")
@Tag(name = "Management Residence", description = "API for Residence")
public interface BookingAPI {

    @GetMapping
    PageResponseCustom<BookingResponse> getBooking(
            @RequestParam(required = false, value = "search", defaultValue = "") String search,
            @RequestParam(required = false, value = "status", defaultValue = "PENDING") EBookingStatus status,
            @RequestParam(required = false, value = "page", defaultValue = "1") Integer page,
            @RequestParam(required = false, value = "size", defaultValue = "12") Integer size);

    @PatchMapping("/{bookingId}/{status}")
    void changeStatus(@PathVariable Integer bookingId, @PathVariable EBookingStatus status);

    @DeleteMapping("/{bookingId}")
    void cancelBooking(@PathVariable Integer bookingId);

}
