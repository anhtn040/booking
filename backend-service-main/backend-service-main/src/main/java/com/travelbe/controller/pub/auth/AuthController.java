package com.travelbe.controller.pub.auth;

import com.travelbe.controller.pub.auth.models.Email;
import com.travelbe.controller.pub.auth.models.ForgotPasswordForm;
import com.travelbe.controller.pub.auth.models.LoginForm;
import com.travelbe.controller.pub.auth.models.RefreshToken;
import com.travelbe.controller.pub.auth.models.RegisterForm;
import com.travelbe.controller.pub.auth.models.TokenResponse;
import com.travelbe.service.account.user.UserService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthController implements AuthAPI {

    @NonNull final UserService userService;

    @Override
    public TokenResponse login(LoginForm loginForm) {
        return userService.login(loginForm);
    }

    @Override
    public void register(RegisterForm registerForm) {
        userService.register(registerForm);
    }

    @Override
    public void getCode(Email email) {
        userService.getCode(email);
    }

    @Override
    public void forgotPassword(ForgotPasswordForm forgotPasswordForm) {
        userService.forgotPassword(forgotPasswordForm);
    }

    @Override
    public TokenResponse refreshToken(RefreshToken refreshToken) {
        return userService.refreshToken(refreshToken);
    }

}
