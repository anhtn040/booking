package com.travelbe.service.hotel.booking;

import com.travelbe.controller.residence.models.BookingResponse;
import com.travelbe.controller.residence.models.BookingStatistic;
import com.travelbe.controller.residence.models.BookingStatisticDetail;
import com.travelbe.controller.residence.models.StatisticForm;
import com.travelbe.database.sql.hotel.booking.BookingEntity;
import com.travelbe.database.sql.hotel.booking.BookingRepository;
import com.travelbe.dto.hotel.booking.BookingMapper;
import com.travelbe.model.PageRequestCustom;
import com.travelbe.model.PageResponseCustom;
import com.travelbe.model.enums.EBookingStatus;
import com.travelbe.util.AuthenticationCurrent;
import jakarta.validation.constraints.NotNull;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingQueryService {

    @NonNull final AuthenticationCurrent authCurrent;
    @NotNull final BookingRepository bookingRepository;
    @NotNull final BookingMapper bookingMapper;

    public PageResponseCustom<BookingResponse> getBooking(String search, EBookingStatus status, PageRequestCustom pageRequestCustom) {

        Page<BookingEntity> foundBooking = bookingRepository
                .findAllByUserIdResidenceAndStatus(authCurrent.getUser().getUserId(),
                        search.toLowerCase(),
                        status,
                        pageRequestCustom.pageRequest());

        return PageResponseCustom.<BookingResponse>
                builder()
                .data(bookingMapper.toDto(foundBooking.getContent()))
                .totalElement((int)foundBooking.getTotalElements())
                .totalPage(foundBooking.getTotalPages())
                .currentPage(pageRequestCustom.currentPage())
                .pageSize(pageRequestCustom.pageSize())
                .build();
    }

    public BookingStatistic getStatistic(StatisticForm statisticForm) {
        List<BookingStatisticDetail> found = bookingRepository.getStatisticByUserIdDateRange(authCurrent.getUser().getUserId(), statisticForm)
                .stream().map(xx -> bookingMapper.toDto((BookingEntity) xx[0],(Double) xx[1],(int)(long) xx[2]))
                .toList();
        return new BookingStatistic(found, found.stream().mapToDouble(BookingStatisticDetail::total).sum());
    }
}
