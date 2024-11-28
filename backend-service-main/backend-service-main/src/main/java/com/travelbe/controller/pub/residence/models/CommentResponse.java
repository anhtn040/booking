package com.travelbe.controller.pub.residence.models;

import java.time.LocalDateTime;

public record CommentResponse(
        Integer commentId,
        String name,
        String avatar,
        Integer rating,
        String comment,
        LocalDateTime localDateTime
) {}
