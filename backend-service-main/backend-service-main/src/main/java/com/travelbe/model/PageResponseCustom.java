package com.travelbe.model;

import lombok.Builder;
import lombok.NonNull;

import java.util.List;

@Builder
public record PageResponseCustom<T>(@NonNull List<T> data, @NonNull Integer totalPage, @NonNull Integer totalElement,
                                    @NonNull Integer pageSize, @NonNull Integer currentPage){
    public PageResponseCustom(@NonNull List<T> data, @NonNull Integer totalPage, @NonNull Integer totalElement,
                              @NonNull Integer pageSize, @NonNull Integer currentPage) {
        this.data = data;
        this.totalPage = totalPage;
        this.totalElement = totalElement;
        this.pageSize = pageSize;
        this.currentPage = currentPage;
    }

    public @NonNull List<T> data() {
        return this.data;
    }

    public @NonNull Integer totalPage() {
        return this.totalPage;
    }

    public @NonNull Integer totalElement() {
        return this.totalElement;
    }

    public @NonNull Integer pageSize() {
        return this.pageSize;
    }

    public @NonNull Integer currentPage() {
        return this.currentPage;
    }
}
