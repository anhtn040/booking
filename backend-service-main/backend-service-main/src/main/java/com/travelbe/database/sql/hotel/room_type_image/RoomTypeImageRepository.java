package com.travelbe.database.sql.hotel.room_type_image;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomTypeImageRepository extends JpaRepository<RoomTypeImageEntity, Integer> {


    void deleteAllByRoomTypeId(Integer roomTypeId);

    @Query("""
        SELECT ri FROM RoomTypeEntity rt
        INNER JOIN RoomTypeImageEntity ri
            ON rt.roomTypeId = ri.roomTypeId
        WHERE rt.residenceId = :residenceId
    """)
    List<RoomTypeImageEntity> findAllByResidenceId(Integer residenceId);

    List<RoomTypeImageEntity> findAllByRoomTypeIdIn(List<Integer> roomsId);
}
