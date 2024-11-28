package com.travelbe.service.roles.permission;

import com.travelbe.database.sql.roles.permission.PermissionRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PermissionQueryService {

    @NonNull final PermissionRepository permissionRepository;

    public List<String> permissionsMe() {
        return SecurityContextHolder.getContext()
                                    .getAuthentication()
                                    .getAuthorities()
                                    .stream()
                                    .map(GrantedAuthority::getAuthority)
                                    .toList();
    }

    public List<String> permissionsUserId(Integer userId) {
        return permissionRepository.findByUserId(userId);
    }
}
