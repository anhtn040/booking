package com.travelbe.controller.residence.models;

import lombok.NonNull;

public record UpdateImageRoom(
        Integer roomTypeImageId,
        Integer roomTypeId,
        @NonNull String url
) {}
