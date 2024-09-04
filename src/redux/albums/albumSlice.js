import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants/apiConstant";

const albumSlice = createSlice({
  //on lui donne un nom
  name: "albums",
  //on initialise les valeurs par defaut
  initialState: {
    loading: false, // un flag pour gerer l'attente des requetes
    albums: [], // un compartiment de rayon pour stocker la liste de tous les albums
    albumDetail: {}, // un compartiment de rayon pour stocker les détails d'un album
    searchAlbum: [], // un compartiment de rayon pour stocker les résultats de recherche sur album
    searchArtist: [], // un compartiment de rayon pour stocker les résultats de recherche sur artiste
    searchTitle: [], // un compartiment de rayon pour stocker les résultats de recherche sur les titre
  },
  //méthode qui permet de remplir les states
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAlbums: (state, action) => {
      state.albums = action.payload;
    },
    setAlbumDetail: (state, action) => {
      state.albumDetail = action.payload;
    },
    setSearchAlbum: (state, action) => {
      state.searchAlbum = action.payload;
    },
    setSearchArtist: (state, action) => {
      state.searchArtist = action.payload;
    },
    setSearchTitle: (state, action) => {
      state.searchTitle = action.payload;
    },
  }
});

export const { setLoading, setAlbums, setAlbumDetail, setSearchAlbum, setSearchArtist, setSearchTitle } = albumSlice.actions;

//on crée les méthodes qui permettront de récupérer les données dans la bdd
export const fetchAlbums = () => async dispatch => {
  try {
    //on va passer le loading à true
    dispatch(setLoading(true));
    //on va faire une requête à l'api
    const response = await axios.get(`${API_URL}/albums?page=1&isActive=true`)
    //on va setter les données dans le state
    dispatch(setAlbums(response.data));
    //on repasse le loading à false
    dispatch(setLoading(false));
  } catch (error) {
    console.log(`Erreur lors de la récupération des albums: ${error}`);
    //on repasse le loading à false
    dispatch(setLoading(false));
  }
};

//on crée une méthode qui permet de récuperer les information d'un album dans la bdd
export const fetchAlbumDetail = (id) => async dispatch => {
  try {
    //on passe le loading à true
    dispatch(setLoading(true));
    //on fait une requête à l'api
    const response = await axios.get(`${API_URL}/albums/${id}`);
    //on set les données dans le state
    dispatch(setAlbumDetail(response.data));
    //on repasse le loading à false
    dispatch(setLoading(false));
  } catch (error) {
    console.log(`Erreur lors de la récupération des détails de l'album: ${error}`);
    //on repasse le loading à false
    dispatch(setLoading(false));
  }
}

//on crée une méthode pour faire une recherche
export const fetchSearch = (searchWord) => async dispatch => {
  try {
    //on passe loading à true
    dispatch(setLoading(true));
    
    const responseAlbums = await axios.get(`${API_URL}/albums?page=1&title=${searchWord}&isActive=true`);
    const responseArtist = await axios.get(`${API_URL}/artists?page=1&name=${searchWord}&albums.isActive=true`);
    const responseTitle = await axios.get(`${API_URL}/albums?page=1&songs.title=${searchWord}&isActive=true`);

    dispatch(setSearchAlbum(responseAlbums.data));
    dispatch(setSearchArtist(responseArtist.data));
    dispatch(setSearchTitle(responseTitle.data));

    //on repasse loading à false
    dispatch(setLoading(false));
  } catch (error) {
    console.log(`Erreur lors de la recherche: ${error}`);
    //on repasse loading à false
    dispatch(setLoading(false));
  }
}

//on export notre reducer
export default albumSlice.reducer;