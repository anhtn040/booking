package com.travelbe.util;

import com.travelbe.config.exception.UnauthorizedException;
import com.travelbe.database.sql.account.user.UserEntity;
import com.travelbe.database.sql.account.user.UserRepository;
import com.travelbe.model.enums.EStatus;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AuthenticationCurrent {

    @NonNull final UserRepository userRepository;

//    public static Integer getUserId() {
//        Object userId = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        if(Objects.isNull(userId)) throw new UnauthorizedException();
//        return Integer.valueOf(userId.toString());
//    }

    public Integer getUserId() {
        Object userId = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(Objects.isNull(userId)) throw new UnauthorizedException();
        return Integer.valueOf(userId.toString());
    }

    public UserEntity getUser() {
        Object userId = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(Objects.isNull(userId)) throw new UnauthorizedException();
        return userRepository.findByUserIdAndStatus(Integer.valueOf(userId.toString()), EStatus.ACTIVE)
                .orElseThrow(UnauthorizedException::new);
    }
}
