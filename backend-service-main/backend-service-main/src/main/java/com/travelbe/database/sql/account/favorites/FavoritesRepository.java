package com.travelbe.database.sql.account.favorites;

import com.travelbe.database.sql.hotel.residence.ResidenceEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FavoritesRepository extends JpaRepository<FavoritesEntity, Integer> {

    Optional<FavoritesEntity> findByUserIdAndResidenceId(Integer userId, Integer residenceId);

    @Query("""
        SELECT r FROM FavoritesEntity f
        INNER JOIN ResidenceEntity r ON f.residenceId = r.residenceId
        WHERE f.userId = :userId
    """)
    Page<ResidenceEntity> findByUserId(Integer userId, Pageable pageable);
}
