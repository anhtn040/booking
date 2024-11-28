package com.travelbe.controller.user_me.models;

import lombok.Builder;

@Builder
public record DropdownMe(
        String avatar,
        Boolean hasPermission
) {}
