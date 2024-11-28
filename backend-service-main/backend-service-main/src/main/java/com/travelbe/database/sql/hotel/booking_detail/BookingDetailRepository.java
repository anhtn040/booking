package com.travelbe.database.sql.hotel.booking_detail;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingDetailRepository extends JpaRepository<BookingDetailEntity, Integer> {

    @Query("""
        SELECT bd, rt.name FROM BookingDetailEntity bd
        INNER JOIN RoomTypeEntity rt ON bd.roomTypeId = rt.roomTypeId
        WHERE bd.bookingId IN :bookingId
    """)
    List<Object[]> findAllByBookingId(List<Integer> bookingId);

    @Query("""
        SELECT bd, rt.name FROM BookingDetailEntity bd
        INNER JOIN RoomTypeEntity rt ON bd.roomTypeId = rt.roomTypeId
        WHERE bd.bookingId = :bookingId
    """)
    List<Object[]> findByBookingId(Integer bookingId);
}
