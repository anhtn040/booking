package com.travelbe.database.sql.hotel.booking;

import com.travelbe.controller.residence.models.StatisticForm;
import com.travelbe.model.enums.EBookingStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<BookingEntity, Integer> {

    @Query("""
        SELECT b, r, rv FROM BookingEntity b
        INNER JOIN ResidenceEntity r ON b.residenceId = r.residenceId
        LEFT JOIN ReviewEntity rv ON b.bookingId = rv.bookingId
        WHERE b.userId = :userId
    """)
    Page<Object[]> findAllByUserId(Integer userId, Pageable pageable);


    Optional<BookingEntity> findByBookingId(Integer bookingId);

    @Query("""
        SELECT b FROM BookingEntity b
        INNER JOIN ResidenceEntity r ON b.residenceId = r.residenceId
        INNER JOIN UserResidenceEntity ur ON r.residenceId = ur.residenceId
        WHERE ur.userId = :userId
            AND b.status = :status
            AND (:#{#search.empty} = TRUE
                OR LOWER(b.name) LIKE %:search%
                OR LOWER(b.phone) LIKE %:search%)
    """)
    Page<BookingEntity> findAllByUserIdResidenceAndStatus(Integer userId, String search, EBookingStatus status, Pageable pageable);

    @Query("""
        SELECT b FROM BookingEntity b
        INNER JOIN ResidenceEntity r ON b.residenceId = r.residenceId
        INNER JOIN UserResidenceEntity ur ON r.residenceId = ur.residenceId
        WHERE ur.userId = :userId
            AND b.bookingId = :bookingId
    """)
    Optional<BookingEntity> findByUserIdResidenceAndBookingId(Integer userId, Integer bookingId);

    @Query("""
        SELECT b, SUM(bd.quantity*bd.price*
            CASE WHEN DATEDIFF(b.checkout, b.checkin) < 2 THEN 1 ELSE DATEDIFF(b.checkout, b.checkin) END),
            SUM(bd.quantity)
        FROM BookingEntity b
        INNER JOIN ResidenceEntity re ON b.residenceId = re.residenceId
        INNER JOIN BookingDetailEntity bd ON b.bookingId = bd.bookingId
        INNER join UserResidenceEntity ur ON re.residenceId = ur.residenceId
        WHERE
            ((:#{#form.hasStatus()} = FALSE AND b.status = 'COMPLETED')
              OR (:#{#form.hasStatus()} = TRUE AND b.status = :#{#form.status()}))
            AND ur.userId = :userId
            AND b.checkin BETWEEN :#{#form.start()} AND :#{#form.end()}
            AND b.checkout BETWEEN :#{#form.start()} AND :#{#form.end()}
        group by b
    """)
    List<Object[]> getStatisticByUserIdDateRange(Integer userId, StatisticForm form);
}
