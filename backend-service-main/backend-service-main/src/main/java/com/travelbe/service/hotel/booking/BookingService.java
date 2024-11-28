package com.travelbe.service.hotel.booking;

import com.travelbe.controller.residence.models.BookingResponse;
import com.travelbe.controller.residence.models.BookingStatistic;
import com.travelbe.controller.residence.models.StatisticForm;
import com.travelbe.model.PageRequestCustom;
import com.travelbe.model.PageResponseCustom;
import com.travelbe.model.enums.EBookingStatus;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class BookingService {

    @NonNull final BookingQueryService bookingQueryService;
    @NonNull final BookingCommandService bookingCommandService;

    public PageResponseCustom<BookingResponse> getBooking(String search, EBookingStatus status, PageRequestCustom pageRequestCustom) {
        return bookingQueryService.getBooking(search, status, pageRequestCustom);
    }

    public void changeStatus(Integer bookingId, EBookingStatus status) {
        bookingCommandService.changeStatus(bookingId, status);
    }

    public void cancelBooking(Integer bookingId) {
        bookingCommandService.cancelBooking(bookingId);
    }

    public BookingStatistic getStatistic(StatisticForm statisticForm) {
        return bookingQueryService.getStatistic(statisticForm);
    }
}
