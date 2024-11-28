package com.travelbe.service.user_residence;

import com.travelbe.controller.residence.models.HumanRequest;
import com.travelbe.database.sql.account.user.UserEntity;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserResidenceService {

    @NonNull final UserResidenceQueryService userResidenceQueryService;
    @NonNull final UserResidenceCommandService userResidenceCommandService;

    public List<UserEntity> humanOfResidence(String search) {
        return userResidenceQueryService.humanOfResidence(search);
    }

    @Transactional
    public void createHuman(HumanRequest human) {
        userResidenceCommandService.createHuman(human);
    }

    public void updateStatus(Integer humanId) {
        userResidenceCommandService.updateStatus(humanId);
    }

    @Transactional
    public void delete(Integer humanId) {
        userResidenceCommandService.deleteHuman(humanId);
    }
}
