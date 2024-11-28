//package com.travelbe.database.sql.helps.order;
//
//import com.travelbe.model.enums.EPurchase;
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
//import java.time.LocalDateTime;
//
//@Entity
//@Data
//@Builder
//@NoArgsConstructor
//@AllArgsConstructor
//@Table(name = "orders")
//public class OrderEntity {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Integer orderId;
//    private Integer userId;
//    private String name;
//    private String phone;
//    @Enumerated(EnumType.STRING)
//    private EPurchase purchaseType;
//    @Enumerated(EnumType.STRING)
//    private EStatus status;
//    private Boolean paid;
//    private String note;
//    private LocalDateTime createdAt = LocalDateTime.now();
//    private LocalDateTime updatedAt = LocalDateTime.now();
//}
