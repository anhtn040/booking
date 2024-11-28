package com.travelbe.database.sql.hotel.special_price;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpecialPriceRepository extends JpaRepository<SpecialPriceEntity, Integer> {
}
