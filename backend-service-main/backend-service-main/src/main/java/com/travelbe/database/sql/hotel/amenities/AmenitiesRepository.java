package com.travelbe.database.sql.hotel.amenities;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AmenitiesRepository extends JpaRepository<AmenitiesEntity, Integer> {
}
