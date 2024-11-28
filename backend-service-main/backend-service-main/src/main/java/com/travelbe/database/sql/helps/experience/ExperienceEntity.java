//package com.travelbe.database.sql.helps.experience;
//
//import com.travelbe.model.enums.ECatalog;
//import com.travelbe.model.enums.EStatus;
//import jakarta.persistence.Entity;
//import jakarta.persistence.EnumType;
//import jakarta.persistence.Enumerated;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.Table;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//@Entity
//@Data
//@Builder
//@NoArgsConstructor
//@AllArgsConstructor
//@Table(name = "experiences")
//public class ExperienceEntity {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Integer experience_id;
//    @Enumerated(EnumType.STRING)
//    private ECatalog catalog;
//    private String name;
//    private Double price;
//    private String unit;
//    private String time;
//    private String avatar;
//    private String description;
//    @Enumerated(EnumType.STRING)
//    private EStatus status;
//}
