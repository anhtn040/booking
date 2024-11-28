package com.travelbe.service.account.favorites;

import com.travelbe.controller.pub.residence.models.ResidenceBanner;
import com.travelbe.model.PageRequestCustom;
import com.travelbe.model.PageResponseCustom;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FavoritesService {

    @NonNull final FavoritesQueryService favoritesQueryService;
    @NonNull final FavoritesCommandService favoritesCommandService;

    public PageResponseCustom<ResidenceBanner> getFavorites(PageRequestCustom pageRequestCustom) {
        return favoritesQueryService.getFavorites(pageRequestCustom);
    }

    public void updateFavorites(Integer residenceId) {
        favoritesCommandService.updateFavorites(residenceId);
    }
}
