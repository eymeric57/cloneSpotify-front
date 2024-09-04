import { createSelector } from "@reduxjs/toolkit";

//on récupère les données du slice qu'on va stocker dans des constantes
const selectLoading = state => state.albums.loading;
const selectAlbums = state => state.albums.albums;
const selectAlbumDetail = state => state.albums.albumDetail;
const selectSearchAlbum = state => state.albums.searchAlbum;
const selectSearchArtist = state => state.albums.searchArtist;
const selectSearchTitle = state => state.albums.searchTitle;
//on crée le selector
export const selectAlbumsData = createSelector(
  [selectLoading, selectAlbums, selectAlbumDetail, selectSearchAlbum,selectSearchArtist,selectSearchTitle], 
  (loading, albums, albumDetail, searchAlbum, searchArtist, searchTitle) => ({ loading, albums, albumDetail, searchAlbum, searchArtist, searchTitle })
)