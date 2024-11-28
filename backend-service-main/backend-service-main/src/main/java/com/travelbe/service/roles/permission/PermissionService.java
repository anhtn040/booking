package com.travelbe.service.roles.permission;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PermissionService {

    @NonNull
    final PermissionCommandService permissionCommandService;
    @NonNull final PermissionQueryService permissionQueryService;

    public List<String> permissionsMe() {
        return permissionQueryService.permissionsMe();
    }

    public List<String> permissionUserId(Integer userId) {
        return permissionQueryService.permissionsUserId(userId);
    }
}
