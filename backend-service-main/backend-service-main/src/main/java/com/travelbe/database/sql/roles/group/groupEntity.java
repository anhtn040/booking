package com.travelbe.database.sql.roles.group;

import com.travelbe.model.enums.EStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "groups")
public class groupEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer groupId;
    private String groupCode;
    private String groupName;
    @Enumerated(EnumType.STRING)
    private EStatus status = EStatus.ACTIVE;
}
