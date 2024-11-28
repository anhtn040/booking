package com.travelbe.database.sql.hotel.user_residence;

import com.travelbe.database.sql.account.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserResidenceRepository extends JpaRepository<UserResidenceEntity, Integer> {

    Optional<UserResidenceEntity> findByUserId(Integer userId);
    @Query("""
        SELECT u FROM UserResidenceEntity ur
        INNER JOIN UserEntity u ON ur.userId = u.userId
        WHERE ur.residenceId = :residenceId
            AND(:#{#search.empty} = TRUE
                OR LOWER(u.fullname) LIKE %:search%
                OR LOWER(u.email) LIKE %:search%)
    """)
    List<UserEntity> findByResidenceId(Integer residenceId, String search);

    void deleteAllByUserId(Integer userId);
}
