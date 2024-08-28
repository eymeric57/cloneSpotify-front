import { createSelector } from "@reduxjs/toolkit"

//on récupére les données du slice qu'on va stocker dans des constantes 
const selectLoading = (state) => state.albums.loading;
const selectAlbums = (state) => state.albums.albums;
const selectAlbumDetail = (state) => state.albums.albumDetail;

//on crée le selector 
export const selectAlbumsData = createSelector (
    [selectLoading, selectAlbums , selectAlbumDetail],
    (loading, albums, albumDetail ) => ({loading, albums, albumDetail })
)

