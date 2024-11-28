package com.travelbe.database.sql.hotel.review;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<ReviewEntity, Integer> {

    Optional<ReviewEntity> findByBookingId(Integer bookingId);
    Page<ReviewEntity> findByResidenceId(Integer residenceId, Pageable pageable);
}
