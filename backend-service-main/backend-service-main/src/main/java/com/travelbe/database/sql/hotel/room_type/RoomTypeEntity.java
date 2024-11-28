package com.travelbe.database.sql.hotel.room_type;

import com.travelbe.model.enums.EStatus;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "room_type")
public class RoomTypeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer roomTypeId;
    private Integer residenceId;
    private String name;
    private Integer beds;
    private Integer area;
    private Integer quantity;
    private Double price;
    @Enumerated(EnumType.STRING)
    private EStatus status = EStatus.ACTIVE;
}
