import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants/apiConstant";

const artistSlice = createSlice({
  name: "artists",
  initialState: {
    loading: false,
    artistDetail: {}
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setArtistDetail: (state, action) => {
      state.artistDetail = action.payload;
    }
  }
});

export const { setLoading, setArtistDetail } = artistSlice.actions;

//on crée une méthode qui permet de récuperer les information d'un artiste dans la bdd
export const fetchArtistDetail = (id) => async dispatch => {
  try {
    //on passe le loading à true
    dispatch(setLoading(true));
    //on fait une requête à l'api
    const response = await axios.get(`${API_URL}/artists/${id}`);
    //on set les données dans le state
    dispatch(setArtistDetail(response.data));
    //on repasse le loading à false
    dispatch(setLoading(false));
  } catch (error) {
    console.log(`Erreur lors de la récupération des détails de l'artiste: ${error}`);
    //on repasse le loading à false
    dispatch(setLoading(false));
  }
}

export default artistSlice.reducer;
