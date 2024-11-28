package com.travelbe.database.sql.roles.permission;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PermissionRepository extends JpaRepository<PermissionEntity, Integer> {

    @Query("""
        SELECT p.permissionCode FROM UserGroupEntity ug
        INNER JOIN PermissionGroupEntity pg ON ug.groupId = pg.groupId
        INNER JOIN PermissionEntity p ON pg.permissionId = p.permissionId
        WHERE ug.userId = :userId AND p.status = 'ACTIVE'
    """)
    List<String> findByUserId(Integer userId);
}
