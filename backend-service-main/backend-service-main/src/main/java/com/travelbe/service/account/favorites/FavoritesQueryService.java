package com.travelbe.service.account.favorites;

import com.travelbe.controller.pub.residence.models.ResidenceBanner;
import com.travelbe.database.sql.account.favorites.FavoritesRepository;
import com.travelbe.database.sql.hotel.residence.ResidenceEntity;
import com.travelbe.dto.hotel.residence.ResidenceMapper;
import com.travelbe.model.PageRequestCustom;
import com.travelbe.model.PageResponseCustom;
import com.travelbe.util.AuthenticationCurrent;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FavoritesQueryService {

    @NonNull final FavoritesRepository favoritesRepository;
    @NonNull final AuthenticationCurrent authCurrent;
    @NonNull final ResidenceMapper residenceMapper;

    public PageResponseCustom<ResidenceBanner> getFavorites(PageRequestCustom pageRequestCustom) {
        Integer userId = authCurrent.getUserId();
        Page<ResidenceEntity> favorites = favoritesRepository.findByUserId(userId, pageRequestCustom.pageRequest());
        return PageResponseCustom.<ResidenceBanner>builder()
                                .data(residenceMapper.toDto(favorites.getContent()))
                                .totalElement((int) favorites.getTotalElements())
                                .totalPage(favorites.getTotalPages())
                                .currentPage(pageRequestCustom.currentPage())
                                .pageSize(pageRequestCustom.pageSize())
                                .build();
    }
}
