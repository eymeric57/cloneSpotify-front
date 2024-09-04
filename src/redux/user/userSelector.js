import { createSelector } from "@reduxjs/toolkit";

const selectLoading = state => state.users.loading;
const selectUserDetail = state => state.users.userDetail;
const selectAvatars = state => state.users.avatars;
const selectUserFavorite = state => state.users.userFavorite;
const selectUserPlaylists = state => state.users.userPlaylists;

export const selectUserData = createSelector(
  [selectLoading, selectUserDetail, selectAvatars, selectUserFavorite, selectUserPlaylists],
  (loading, userDetail, avatars, userFavorite, userPlaylists) => ({ loading, userDetail, avatars, userFavorite, userPlaylists })
)