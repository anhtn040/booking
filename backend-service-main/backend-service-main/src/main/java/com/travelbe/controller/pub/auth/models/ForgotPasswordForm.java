package com.travelbe.controller.pub.auth.models;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.Objects;

public record ForgotPasswordForm(
        @NotBlank(message = "Tên tài khoản không chứa ký tự đặc biệt")
        @Size(min = 6, message = "Mật khẩu phải từ 6 ký tự")
        String newPassword,
        @NotBlank(message = "Tên tài khoản không chứa ký tự đặc biệt")
        @Size(min = 6, message = "Mật khẩu phải từ 6 ký tự")
        String confirmPassword,
        @NotBlank String token
) {
    @AssertTrue(message = "Hai mật khẩu không khớp !!")
    public boolean isMatches() {
        if(Objects.nonNull(newPassword) && Objects.nonNull(confirmPassword)) {
            return (newPassword.equals(confirmPassword));
        }
        return false;
    }
}
