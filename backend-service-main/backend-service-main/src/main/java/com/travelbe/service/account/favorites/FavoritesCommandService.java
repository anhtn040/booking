package com.travelbe.service.account.favorites;

import com.travelbe.database.sql.account.favorites.FavoritesEntity;
import com.travelbe.database.sql.account.favorites.FavoritesRepository;
import com.travelbe.util.AuthenticationCurrent;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FavoritesCommandService {

    @NonNull final FavoritesRepository favoritesRepository;
    @NonNull final AuthenticationCurrent authCurrent;

    public void updateFavorites(Integer residenceId) {
        Integer userId = authCurrent.getUserId();
        Optional<FavoritesEntity> foundFavorites = favoritesRepository
                .findByUserIdAndResidenceId(userId, residenceId);
        if(foundFavorites.isEmpty()) {
            favoritesRepository.save(new FavoritesEntity(null, userId, residenceId));
        } else {
            favoritesRepository.deleteById(foundFavorites.get().getFavoriteId());
        }
    }
}
