package com.travelbe.database.sql.hotel.profit;

import com.travelbe.model.enums.EProfit;
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

import java.time.LocalDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "profit")
public class ProfitEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer profitId;
    private Double percent;
    @Enumerated(EnumType.STRING)
    private EProfit profitType = EProfit.APP;
    private LocalDateTime createdAt = LocalDateTime.now();
}
