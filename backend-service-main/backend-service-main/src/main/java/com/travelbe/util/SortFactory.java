package com.travelbe.util;

import com.travelbe.model.enums.ESort;
import org.springframework.data.domain.Sort;

public class SortFactory {

    public static Sort getSort(ESort sort) {
        switch (sort) {
            case PRICE -> {
                return Sort.by("price").ascending();
            }
            case RATING -> {
                return Sort.by("rating").descending();
            }
            case REVIEWS -> {
                return Sort.by("reviews").descending();
            }
            default -> {
                return Sort.unsorted();
            }
        }
    }
}
