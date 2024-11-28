package com.travelbe.database.sql.hotel.residence;

import com.travelbe.model.enums.EResidence;
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
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "residences")
@EqualsAndHashCode(callSuper = false)
public class ResidenceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer residenceId;
    private Integer userId;
    private String name;
    private String address;
    private String description;
    private Double lat;
    private Double lon;
    private String checkin;
    private String checkout;
    private Double rating;
    private Integer reviews;
    private Double priceMin;
    private String avatar;
    private String bankType;
    private String cardId;
    private String fullname;
    private String phone;
    private String facilities;
    @Enumerated(EnumType.STRING)
    private EResidence type = EResidence.HOTEL;
    @Enumerated(EnumType.STRING)
    private EStatus status = EStatus.ACTIVE;
}
