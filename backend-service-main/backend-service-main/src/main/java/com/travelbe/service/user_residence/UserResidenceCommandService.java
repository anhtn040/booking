package com.travelbe.service.user_residence;

import com.travelbe.config.exception.ConflictException;
import com.travelbe.config.exception.ResourceNotFoundException;
import com.travelbe.controller.residence.models.HumanRequest;
import com.travelbe.database.sql.account.user.UserEntity;
import com.travelbe.database.sql.account.user.UserRepository;
import com.travelbe.database.sql.hotel.user_residence.UserResidenceEntity;
import com.travelbe.database.sql.hotel.user_residence.UserResidenceRepository;
import com.travelbe.database.sql.roles.user_group.UserGroupEntity;
import com.travelbe.database.sql.roles.user_group.UserGroupRepository;
import com.travelbe.dto.account.user.UserMapper;
import com.travelbe.model.enums.EStatus;
import com.travelbe.util.AuthenticationCurrent;
import com.travelbe.util.Const;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserResidenceCommandService {

    @NonNull final UserResidenceRepository userResidenceRepository;
    @NonNull final UserRepository userRepository;
    @NonNull final UserMapper userMapper;
    @NonNull final PasswordEncoder passwordEncoder;
    @NonNull final AuthenticationCurrent authCurrent;
    @NonNull final UserGroupRepository userGroupRepository;

    public void deleteHuman(Integer humanId) {
        userResidenceRepository.deleteAllByUserId(humanId);
        userRepository.deleteById(humanId);
    }

    public void createHuman(HumanRequest human) {
        if(userRepository.findByEmail(human.email()).isPresent()) {
            throw new ConflictException("Email này đã được đăng ký.");
        }
        UserResidenceEntity foundResidence = userResidenceRepository.findByUserId(authCurrent.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Tài khoản không hợp lệ."));
        UserEntity newUser = userMapper.toEntity(human,
                passwordEncoder.encode(human.password()),
                EStatus.ACTIVE,
                Const.AVATAR);
        userRepository.save(newUser);
        UserResidenceEntity newUserRe = UserResidenceEntity.builder()
                                                            .userId(newUser.getUserId())
                                                            .residenceId(foundResidence.getResidenceId())
                                                            .build();
        userResidenceRepository.save(newUserRe);
        userGroupRepository.save(new UserGroupEntity(null, newUser.getUserId(), 1));
    }

    public void updateStatus(Integer humanId) {
        UserEntity found = userRepository.findById(humanId)
                .orElseThrow(() -> new ResourceNotFoundException("Nhân viên không có trong hệ thống"));
        found.setStatus(found.getStatus().equals(EStatus.ACTIVE) ? EStatus.BLOCK : EStatus.ACTIVE);
        userRepository.save(found);
    }
}
