package com.travelbe.controller.user_me.models;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.util.Objects;

public record UpdatePassword(
        @Pattern(regexp = "^[a-zA-Z0-9]{6,20}$", message = "Mật khẩu từ 6 - 20 ký tự và không chứa ký tự đặt biệt")
        String oldPassword,
        @Pattern(regexp = "^[a-zA-Z0-9]{6,20}$", message = "Mật khẩu từ 6 - 20 ký tự và không chứa ký tự đặt biệt")
        String newPassword,
        @Pattern(regexp = "^[a-zA-Z0-9]{6,20}$", message = "Mật khẩu từ 6 - 20 ký tự và không chứa ký tự đặt biệt")
        String confirmPassword
) {
    @AssertTrue(message = "Hai mật khẩu không khớp !!")
    public boolean isMatches() {
        if(Objects.nonNull(newPassword) && Objects.nonNull(confirmPassword)) {
            return (newPassword.equals(confirmPassword));
        }
        return false;
    }
}
