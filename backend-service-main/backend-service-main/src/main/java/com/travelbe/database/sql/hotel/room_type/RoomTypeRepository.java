package com.travelbe.database.sql.hotel.room_type;

import com.travelbe.model.DateRange;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoomTypeRepository extends JpaRepository<RoomTypeEntity, Integer> {

    @Query("""
        SELECT rt,
                CASE WHEN SUM(bd.quantity) IS NULL THEN rt.quantity
                ELSE rt.quantity - SUM(bd.quantity) END
        FROM RoomTypeEntity rt
        LEFT JOIN BookingEntity b
            ON rt.residenceId = b.residenceId
            AND :#{#dateRange.isNonNull()} = TRUE
            AND (b.checkin >= :#{#dateRange.checkin()} AND b.checkin < :#{#dateRange.checkout()}
                OR b.checkout > :#{#dateRange.checkin()} AND b.checkout <= :#{#dateRange.checkout()})
        LEFT JOIN BookingDetailEntity bd ON b.bookingId = bd.bookingId
        WHERE rt.residenceId = :residenceId
              AND rt.status = 'ACTIVE'
        GROUP BY rt.roomTypeId
    """)
    List<Object[]> findAllByResidenceId(Integer residenceId, DateRange dateRange);

    @Query("""
        SELECT rt FROM RoomTypeEntity rt
        INNER JOIN UserResidenceEntity ur ON rt.residenceId = ur.residenceId
        WHERE ur.userId = :userId
    """)
    List<RoomTypeEntity> findAllByUserId(Integer userId);

    Optional<RoomTypeEntity> findByRoomTypeId(Integer roomTypeId);
}
