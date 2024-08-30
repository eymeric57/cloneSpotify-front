import { createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../constants/apiConstant";
import axios from "axios";

const albumSlice = createSlice({
  //on lui donne un nom
  name: "albums",
  //on initialise les valeurs par defaut
  initialState: {
    loading: false, // un flag pour gerer l'attente des requetes
    albums: [], // un compartiment de rayon pour stocker la liste des albums
    albumDetail: {}, // un compartiment de rayon pour stocker les details d'un album
    searchAlbum: [], // un compartiment de rayon pour stocker les resultat de recherche sur ablums
    searchArtist: [],// un compartiment de rayon pour stocker les resultat de recherche sur artist
    searchTitle: [],// un compartiment de rayon pour stocker les resultat de recherche sur titre
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
  },
});

export const { setLoading, setAlbums, setAlbumDetail, setSearchAlbum, setSearchArtist, setSearchTitle } =
  albumSlice.actions;

//on crée les methodes qui permettront de récupéréer les données dans la bdd

export const fetchAlbums = () => async (dispatch) => {
  try {
    //on va passer le loading a true
    dispatch(setLoading(true));
    //on va faire une requete  a l'api
    const response = await axios.get(`${API_URL}/albums?page=1&isActive=true`);
    //on va setter les données dans le state
    dispatch(setAlbums(response.data));
    //on va passer le loading a false
    dispatch(setLoading(false));
  } catch (error) {
    console.log(`Erreur lors de la récupération des albums : ${error}`);
    dispatch(setLoading(false));
  }
};

//recupérer les info d'un album dans la bdd
export const fetchAlbumDetail = (id) => async (dispatch) => {
  try {
    //on va passer le loading a true
    dispatch(setLoading(true));
    //on va faire une requete  a l'api
    const response = await axios.get(`${API_URL}/albums/${id}`);
    //on va setter les données dans le state
    dispatch(setAlbumDetail(response.data));
    //on va passer le loading a false
    dispatch(setLoading(false));
  } catch (error) {
    console.log(
      `Erreur lors de la récupération des détails de l'album : ${error}`
    );
    dispatch(setLoading(false));
  }
};

export const fetchSearch = (searchWord) => async (dispatch) => {
  try {
    //on va passer le loading a true
    dispatch(setLoading(true));
    //on va faire une requete  a l'api
    const responseAlbums = await axios.get(
      `${API_URL}/albums?page=1&title=${searchWord}&isActive=true`
    );

    const responseArtist = await axios.get(
      `${API_URL}/artists?page=1&name=${searchWord}`
    );

    const responseTitle = await axios.get(
      `${API_URL}/albums?page=1&songs.title=${searchWord}&isActive=true`
    );


    dispatch(setSearchAlbum(responseAlbums.data));
    dispatch(setSearchArtist(responseArtist.data));
    dispatch(setSearchTitle(responseTitle.data));


    dispatch(setLoading(false));
  } catch (error) {
    console.log(`Erreur lors de la recherche : ${error}`);
    dispatch(setLoading(false));
  }
};







//on export notre reducer
export default albumSlice.reducer;
