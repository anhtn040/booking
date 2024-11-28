package com.travelbe.controller.residence;

import com.travelbe.controller.residence.models.BookingResponse;
import com.travelbe.model.PageRequestCustom;
import com.travelbe.model.PageResponseCustom;
import com.travelbe.model.enums.EBookingStatus;
import com.travelbe.service.hotel.booking.BookingService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class BookingController implements BookingAPI {

    @NonNull final BookingService bookingService;

    @Override
    public PageResponseCustom<BookingResponse> getBooking(String search, EBookingStatus status, Integer page, Integer size) {
        Sort sort = Sort.by("createdAt").ascending();
        PageRequestCustom pageRequestCustom = PageRequestCustom.of(page, size, sort);
        return bookingService.getBooking(search, status, pageRequestCustom);
    }

    @Override
    public void changeStatus(Integer bookingId, EBookingStatus status) {
        bookingService.changeStatus(bookingId, status);
    }

    @Override
    public void cancelBooking(Integer bookingId) {
        bookingService.cancelBooking(bookingId);
    }
}
