package com.travelbe.service.user_residence;

import com.travelbe.config.exception.ResourceNotFoundException;
import com.travelbe.database.sql.account.user.UserEntity;
import com.travelbe.database.sql.hotel.user_residence.UserResidenceEntity;
import com.travelbe.database.sql.hotel.user_residence.UserResidenceRepository;
import com.travelbe.util.AuthenticationCurrent;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserResidenceQueryService {

    @NonNull final UserResidenceRepository residenceRepository;
    @NonNull final AuthenticationCurrent authCurrent;

    public List<UserEntity> humanOfResidence(String search) {
        UserResidenceEntity foundResidence = residenceRepository.findByUserId(authCurrent.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Tài khoản không thuộc khách sạn nào."));
        return residenceRepository.findByResidenceId(foundResidence.getResidenceId(), search.toLowerCase());
    }
}
