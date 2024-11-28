package com.travelbe.database.sql.hotel.residence_image;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResidenceImageRepository extends JpaRepository<ResidenceImageEntity, Integer> {

    @Query("""
        SELECT ri FROM ResidenceEntity r
        INNER JOIN ResidenceImageEntity ri ON r.residenceId = ri.residenceId
        WHERE r.userId = :userId
    """)
    List<ResidenceImageEntity> findAllByUserId(Integer userId);

    @Query("""
        SELECT ri.url FROM ResidenceImageEntity ri
        WHERE ri.residenceId = :residenceId
    """)
    List<String> findUrlByResidenceId(Integer residenceId);

    @Query("""
        SELECT ri.url
        FROM ResidenceImageEntity ri
        WHERE ri.residenceId = :residenceId
        UNION
        SELECT rti.url
        FROM RoomTypeEntity rt
        INNER JOIN RoomTypeImageEntity rti
            ON rt.roomTypeId = rti.roomTypeId
        WHERE rt.residenceId = :residenceId
    """)
    List<String> findAllImages(Integer residenceId);
}
