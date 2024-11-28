package com.travelbe.controller.residence;

import com.travelbe.controller.residence.models.HumanRequest;
import com.travelbe.controller.residence.models.HumanResponse;
import com.travelbe.database.sql.account.user.UserEntity;
import com.travelbe.model.enums.EGender;
import com.travelbe.service.user_residence.UserResidenceService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class HumanController implements HumanAPI {

    @NonNull final UserResidenceService userResidenceService;

    @Override
    public List<UserEntity> humanOfResidence(String search) {
        return userResidenceService.humanOfResidence(search);
    }

    @Override
    public void createHuman(HumanRequest human) {
        userResidenceService.createHuman(human);
    }

    @Override
    public void updateStatus(Integer humanId) {
        userResidenceService.updateStatus(humanId);
    }

    @Override
    public void delete(Integer humanId) {
        userResidenceService.delete(humanId);
    }
}
