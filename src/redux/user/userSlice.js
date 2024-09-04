import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants/apiConstant";

const userSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    userDetail: {},
    avatars: [],
    userFavorite: [],
    userPlaylists: []
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUserDetail: (state, action) => {
      state.userDetail = action.payload;
    },
    setAvatars: (state, action) => {
      state.avatars = action.payload;
    },
    setUserFavorite: (state, action) => {
      state.userFavorite = action.payload;
    },
    setUserPlaylists: (state, action) => {
      state.userPlaylists = action.payload;
    }
  }
});

export const { setLoading, setUserDetail, setAvatars, setUserFavorite, setUserPlaylists } = userSlice.actions;

//on crée une méthode qui permet de récuperer les information d'un user dans la bdd
export const fetchUserDetail = (id) => async dispatch => {
  try {
    //on passe le loading à true
    dispatch(setLoading(true));
    //on fait une requête à l'api
    const response = await axios.get(`${API_URL}/users/${id}`);
    //on set les données dans le state
    dispatch(setUserDetail(response.data));
    //on repasse le loading à false
    dispatch(setLoading(false));
  } catch (error) {
    console.log(`Erreur lors de la récupération des détails de l'user: ${error}`);
    //on repasse le loading à false
    dispatch(setLoading(false));
  }
}

//on crée une méthode qui permet de récuperer les information d'un user dans la bdd
export const fetchAvatars = () => async dispatch => {
  try {
    //on passe le loading à true
    dispatch(setLoading(true));
    //on fait une requête à l'api
    const response = await axios.get(`${API_URL}/avatars?page=1&isActive=true`);
    //on set les données dans le state
    dispatch(setAvatars(response.data['hydra:member']));
    //on repasse le loading à false
    dispatch(setLoading(false));
  } catch (error) {
    console.log(`Erreur lors de la récupération des avatars: ${error}`);
    //on repasse le loading à false
    dispatch(setLoading(false));
  }
}

//on crée une méthode pour récupérer les favoris d'un user
export const fetchUserFavorite = (id) => async dispatch => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get(`${API_URL}/users?page=1&id=${id}`);
    dispatch(setUserFavorite(response.data['hydra:member'][0].albums))
    dispatch(setLoading(false));
  } catch (error) {
    console.log(`Erreur lors de la récupération des favoris de l'utilisateur: ${error}`);
    dispatch(setLoading(false));
  }
}

//méthode qui récupère les playlist d'un utilisateur
export const fetchUserPlaylists = (id) => async dispatch => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get(`${API_URL}/playlists?page=1&user=${id}`);
    dispatch(setUserPlaylists(response.data['hydra:member']));
    dispatch(setLoading(false));
  } catch (error) {
    console.log(`Erreur lors de la récupération des playlists de l'utilisateur: ${error}`);
    dispatch(setLoading(false));
  }
}

export default userSlice.reducer;
