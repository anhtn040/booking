package com.travelbe.service.hotel.booking;

import com.travelbe.config.exception.ForbiddenException;
import com.travelbe.config.exception.ResourceNotFoundException;
import com.travelbe.database.sql.hotel.booking.BookingEntity;
import com.travelbe.database.sql.hotel.booking.BookingRepository;
import com.travelbe.model.enums.EBookingStatus;
import com.travelbe.util.AuthenticationCurrent;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookingCommandService {

    @NonNull final BookingRepository bookingRepository;
    @NonNull final AuthenticationCurrent authCurrent;

    public void changeStatus(Integer bookingId, EBookingStatus status) {
        BookingEntity foundBooking = bookingRepository
                .findByUserIdResidenceAndBookingId(authCurrent.getUser().getUserId(), bookingId)
                .orElseThrow(ResourceNotFoundException::new);
        foundBooking.setStatus(status);
        bookingRepository.save(foundBooking);
    }

    public void cancelBooking(Integer bookingId) {
        BookingEntity foundBooking = bookingRepository
                .findByUserIdResidenceAndBookingId(authCurrent.getUser().getUserId(), bookingId)
                .orElseThrow(ResourceNotFoundException::new);
        bookingRepository.save(BookingEntity.cancelBooking(foundBooking));
    }
}
