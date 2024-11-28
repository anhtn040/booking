package com.travelbe.database.sql.account.user;

import com.travelbe.model.enums.EGender;
import com.travelbe.model.enums.EStatus;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;
    private String email;
    private String password;
    private String fullname;
    @Enumerated(EnumType.STRING)
    private EGender gender = EGender.MALE;
    private String avatar;
    @Enumerated(EnumType.STRING)
    private EStatus status = EStatus.ACTIVE;
}
