package com.travelbe.database.sql.hotel.profit;

import com.travelbe.model.enums.EProfit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfitRepository extends JpaRepository<ProfitEntity, Integer> {

    Optional<ProfitEntity> findFirstByProfitTypeOrderByCreatedAtDesc(EProfit profit);
}
