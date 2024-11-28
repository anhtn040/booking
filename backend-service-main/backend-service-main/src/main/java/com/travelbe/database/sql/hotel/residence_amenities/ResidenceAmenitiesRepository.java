package com.travelbe.database.sql.hotel.residence_amenities;

import com.travelbe.database.sql.hotel.amenities.AmenitiesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResidenceAmenitiesRepository extends JpaRepository<ResidenceAmenitiesEntity, Integer> {

    @Query("""
        SELECT a FROM AmenitiesEntity a
        INNER JOIN ResidenceAmenitiesEntity ra
            ON a.amenitiesId = ra.amenitiesId
        WHERE ra.residenceId = :residenceId
    """)
    List<AmenitiesEntity> findAllByResidenceId(Integer residenceId);
}
