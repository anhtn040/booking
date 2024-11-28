package com.travelbe.database.sql.roles.user_group;

import com.travelbe.database.sql.roles.permission_group.PermissionGroupEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserGroupRepository extends JpaRepository<UserGroupEntity, Integer> {

    @Query("""
        SELECT pg FROM UserGroupEntity ug
        INNER JOIN groupEntity g ON ug.groupId = g.groupId
        INNER JOIN PermissionGroupEntity pg ON g.groupId = pg.groupId
        WHERE ug.userId = :userId AND g.status = 'ACTIVE'
    """)
    List<PermissionGroupEntity> checkPermissionByGroupId(Integer userId);
}
