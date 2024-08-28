import { configureStore } from "@reduxjs/toolkit";
import albumsReducer from "./albums/albumSlice"
import playerReducer from "./player/playerSlice"

const store = configureStore({
    reducer: {
        //on declarera ici les reducers
        albums: albumsReducer,
        player: playerReducer,
    }
})

export default store