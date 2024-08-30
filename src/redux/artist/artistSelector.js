import { createSelector } from "@reduxjs/toolkit";

const selectLoading = state => state.artists.loading;
const selectArtistDetail = state => state.artists.artistDetail;

export const selectArtistData = createSelector(
    [selectLoading, selectArtistDetail],
    (loading, artistDetail) => {
        return {loading, artistDetail}
    })