package com.travelbe.database.sql.hotel.residence;

import com.travelbe.controller.pub.residence.models.AmenitiesCriteria;
import com.travelbe.model.DateRange;
import com.travelbe.model.PriceRange;
import com.travelbe.model.enums.EStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ResidenceRepository extends JpaRepository<ResidenceEntity, Integer> {

    @Query("""
        SELECT re FROM ResidenceEntity re
        INNER JOIN UserResidenceEntity ur ON re.residenceId = ur.residenceId
        WHERE ur.userId = :userId
    """)
    Optional<ResidenceEntity> findByUserIdJoin(Integer userId);

    Optional<ResidenceEntity> findByResidenceIdAndStatus(Integer residenceId, EStatus status);

    @Query("""
        SELECT DISTINCT r,
            CASE WHEN SUM(bd.quantity) IS NULL THEN SUM(rt.quantity)
                ELSE (SUM(rt.quantity) - SUM(bd.quantity)) END
        FROM ResidenceEntity r
        INNER JOIN RoomTypeEntity rt
            ON r.residenceId = rt.residenceId
        LEFT JOIN BookingEntity b
            ON (b.checkin >= :#{#dateRange.checkin()} AND b.checkin < :#{#dateRange.checkout()}
                OR b.checkout > :#{#dateRange.checkin()} AND b.checkout <= :#{#dateRange.checkout()})
            AND r.residenceId = b.residenceId
            AND  b.status <> 'CANCELED'
        LEFT JOIN BookingDetailEntity bd
            ON b.bookingId = bd.bookingId
            AND rt.roomTypeId = bd.roomTypeId
        WHERE r.priceMin BETWEEN :#{#priceRange.priceMin()} AND :#{#priceRange.priceMax()}
            AND r.status = 'ACTIVE'
            AND (:#{#amenitiesCriteria.hasResidenceType()} = FALSE
                OR :#{#amenitiesCriteria.hasHotel()} = r.type
                OR :#{#amenitiesCriteria.hasHomestay()} = r.type
                OR :#{#amenitiesCriteria.hasVilla()} = r.type
                OR :#{#amenitiesCriteria.hasHome()} = r.type)
            AND (:#{#amenitiesCriteria.hasFacilities()} = FALSE
                OR ((:#{#amenitiesCriteria.bbq()} = FALSE OR r.facilities LIKE %:#{#amenitiesCriteria.bbqString()}%)
                    AND (:#{#amenitiesCriteria.seeView()} = FALSE OR r.facilities LIKE %:#{#amenitiesCriteria.seeViewString()}%)
                    AND (:#{#amenitiesCriteria.notDeposit()} = FALSE OR r.facilities LIKE %:#{#amenitiesCriteria.notDepositString()}%)
                    AND (:#{#amenitiesCriteria.washing()} = FALSE OR r.facilities LIKE %:#{#amenitiesCriteria.washingString()}%)
                    AND (:#{#amenitiesCriteria.cook()} = FALSE OR r.facilities LIKE %:#{#amenitiesCriteria.cookString()}%)
                    AND (:#{#amenitiesCriteria.pet()} = FALSE OR r.facilities LIKE %:#{#amenitiesCriteria.petString()}%)
                    AND (:#{#amenitiesCriteria.receptionist()} = FALSE OR r.facilities LIKE %:#{#amenitiesCriteria.receptionistString()}%)
                    AND (:#{#amenitiesCriteria.smoking()} = FALSE OR r.facilities LIKE %:#{#amenitiesCriteria.smokingString()}%)))
        GROUP BY r.residenceId
    """)
    Page<Object[]> getAllResidences(DateRange dateRange, PriceRange priceRange, AmenitiesCriteria amenitiesCriteria, Pageable pageable);

    Optional<ResidenceEntity> findByUserId(Integer userId);
}