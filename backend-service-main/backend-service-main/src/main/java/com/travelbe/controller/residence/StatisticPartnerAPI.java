package com.travelbe.controller.residence;

import com.travelbe.controller.residence.models.BookingStatistic;
import com.travelbe.controller.residence.models.StatisticForm;
import com.travelbe.model.enums.EBookingStatus;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Min;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;

@RequestMapping("/v1/residence/statistic")
@Tag(name = "Management Residence", description = "API for Residence")
public interface StatisticPartnerAPI {

    @PostMapping
    BookingStatistic getStatistic(@RequestBody StatisticForm statisticForm);

    @GetMapping
    BookingStatistic getStatistic(@RequestParam(name = "start") LocalDate start,
                                  @RequestParam(name = "end") LocalDate end,
                                  @RequestParam(name = "status", required = false) EBookingStatus status,
                                  @RequestParam(name = "current", required = false) @Min(1) Long current,
                                  @RequestParam(name = "pageSize", required = false) Long pageSize);
}
