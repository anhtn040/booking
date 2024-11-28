package com.travelbe.database.sql.account.user;

import com.travelbe.model.enums.EStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {

    Optional<UserEntity> findByUserIdAndStatus(Integer username, EStatus status);
    Optional<UserEntity> findByEmailAndStatus(String username, EStatus status);
    Optional<UserEntity> findByEmail(String email);
}
