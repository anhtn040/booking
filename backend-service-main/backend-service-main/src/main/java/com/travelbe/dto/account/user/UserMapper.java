package com.travelbe.dto.account.user;

import com.travelbe.controller.pub.auth.models.RegisterForm;
import com.travelbe.controller.residence.models.HumanRequest;
import com.travelbe.controller.user_me.models.UserResponse;
import com.travelbe.controller.user_me.models.UserUpdate;
import com.travelbe.database.sql.account.user.UserEntity;
import com.travelbe.model.enums.EStatus;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserResponse toDto(UserEntity entity);

    @Mapping(source = "password", target = "password")
    @Mapping(source = "status", target = "status", defaultValue = "ACTIVE")
    @Mapping(source = "avatar", target = "avatar")
    UserEntity toEntity(RegisterForm dto, String password, EStatus status, String avatar);
    void updateEntity(UserUpdate dto, @MappingTarget UserEntity entity);

    @Mapping(source = "password", target = "password")
    @Mapping(target = "status", defaultValue = "ACTIVE")
    @Mapping(source = "avatar", target = "avatar")
    UserEntity toEntity(HumanRequest dto, String password, EStatus status, String avatar);
}
