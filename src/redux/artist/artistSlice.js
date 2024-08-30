import { createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../constants/apiConstant";
import axios from "axios";

const artistSlice = createSlice({
    name: "artists",

    initialState: {
        loading: false,
        artistDetail:{},
    },

    reducers: {

        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setArtistDetail: (state, action) => {
            state.artistDetail = action.payload;
        },
    },
});

export const { setLoading, setArtistDetail } = artistSlice.actions;

export const fetchArtistDetail = (id) => async (dispatch) => {
    try {
        //on va passer le loading a true
        dispatch(setLoading(true)); 
        //on va faire une requete  a l'api
        const response = await axios.get(`${API_URL}/artists/${id}`);
        //on va setter les données dans le state
        dispatch(setArtistDetail(response.data));
        //on va passer le loading a false
        dispatch(setLoading(false));
    } catch (error) {
        console.log(`Erreur lors de la récuperation de l'artiste : ${error}`);
        dispatch(setLoading(false));
    }
}

export default artistSlice.reducer