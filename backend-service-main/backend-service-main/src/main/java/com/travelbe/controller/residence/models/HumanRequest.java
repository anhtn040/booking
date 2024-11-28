package com.travelbe.controller.residence.models;

import com.travelbe.model.enums.EGender;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record HumanRequest(
        @Email(message = "Email không hợp lệ") String email,
        @NotBlank(message = "Tên tài khoản không chứa ký tự đặc biệt")
        @Size(min = 6, message = "Mật khẩu phải từ 6 ký tự")
        String password,
        @NotBlank(message = "Tên tài khoản không chứa ký tự đặc biệt")
        @Size(min = 6, message = "Mật khẩu phải từ 6 ký tự")
        String passwordConfirm,
        @NotNull(message = "Tên không bỏ trống") String fullname,
        @Enumerated(EnumType.STRING)
        EGender gender
) {}
