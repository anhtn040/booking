package com.travelbe.database.sql.hotel.special_price;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "special_price")
public class SpecialPriceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer specialPriceId;
    private String title;
    private Double additionalAmount;
    private LocalDate start;
    private LocalDate end;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Integer residenceId;
}
