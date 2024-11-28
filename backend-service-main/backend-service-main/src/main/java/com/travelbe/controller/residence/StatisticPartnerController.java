package com.travelbe.controller.residence;

import com.travelbe.controller.residence.models.BookingStatistic;
import com.travelbe.controller.residence.models.StatisticForm;
import com.travelbe.model.enums.EBookingStatus;
import com.travelbe.service.hotel.booking.BookingService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequiredArgsConstructor
public class StatisticPartnerController implements StatisticPartnerAPI {

    @NonNull final BookingService bookingService;

    @Override
    public BookingStatistic getStatistic(StatisticForm statisticForm) {
        return bookingService.getStatistic(statisticForm);
    }

    @Override
    public BookingStatistic getStatistic(LocalDate start,
                                         LocalDate end,
                                         EBookingStatus status,
                                         Long current,
                                         Long pageSize) {
        StatisticForm statistic = new StatisticForm(start, end, status);
        return bookingService.getStatistic(statistic);
    }
}
