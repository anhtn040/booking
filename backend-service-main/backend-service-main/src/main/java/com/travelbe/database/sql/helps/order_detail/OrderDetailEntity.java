//package com.travelbe.database.sql.helps.order_detail;
//
//import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.Table;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//import java.time.LocalDate;
//
//@Entity
//@Data
//@Builder
//@NoArgsConstructor
//@AllArgsConstructor
//@Table(name = "order_detail")
//public class OrderDetailEntity {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Integer orderDetailId;
//    private Integer orderId;
//    private Integer experience_id;
//    private Integer quantity;
//    private Double price;
//    private String note;
//    private LocalDate checkin = LocalDate.now();
//
//}
