package com.travelbe.config.exception;

public class ForbiddenException extends RuntimeException {
    public ForbiddenException() {
        super("Không có quyền truy cập.");
    }

}
