package com.travelbe.controller.pub.auth;

import com.travelbe.controller.pub.auth.models.Email;
import com.travelbe.controller.pub.auth.models.ForgotPasswordForm;
import com.travelbe.controller.pub.auth.models.LoginForm;
import com.travelbe.controller.pub.auth.models.RefreshToken;
import com.travelbe.controller.pub.auth.models.RegisterForm;
import com.travelbe.controller.pub.auth.models.TokenResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RequestMapping("/v1/pub")
@Tag(name = "auth", description = "API for login page")
public interface AuthAPI {

    @PostMapping("/login")
    TokenResponse login(@RequestBody @Valid LoginForm loginForm);

    @PostMapping("/register")
    void register(@RequestBody @Valid RegisterForm registerForm);

    @PostMapping("/get-code")
    void getCode(@RequestBody @Valid Email email);

    @PatchMapping("/forgot-password")
    void forgotPassword(@RequestBody @Valid ForgotPasswordForm forgotPasswordForm);

    @PostMapping("/refresh")
    TokenResponse refreshToken(@RequestBody @Valid RefreshToken refreshToken);
}
