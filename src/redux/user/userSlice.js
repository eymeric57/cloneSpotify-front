import { createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../constants/apiConstant";
import axios from "axios";

const userSlice = createSlice({
    name: "users",

    initialState: {
        loading: false,
        userDetail:{},
    },

    reducers: {

        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUserDetail: (state, action) => {
            state.userDetail = action.payload;
        },
    },
});

export const { setLoading, setUserDetail } = userSlice.actions;

export const fetchUserDetail = (id) => async (dispatch) => {
    try {
        //on va passer le loading a true
        dispatch(setLoading(true)); 
        //on va faire une requete  a l'api
        const response = await axios.get(`${API_URL}/user/${id}`);
        //on va setter les données dans le state
        dispatch(setUserDetail(response.data));
        //on va passer le loading a false
        dispatch(setLoading(false));
    } catch (error) {
        console.log(`Erreur lors de la récuperation de l'user : ${error}`);
        dispatch(setLoading(false));
    }
}

export default userSlice.reducer