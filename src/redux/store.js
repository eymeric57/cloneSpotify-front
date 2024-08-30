import { configureStore } from "@reduxjs/toolkit";
import albumsReducer from "./albums/albumSlice"
import playerReducer from "./player/playerSlice"
import artistReducer from "./artist/artistSlice"
import userReducer from "./user/userSlice"

const store = configureStore({
    reducer: {
        //on declarera ici les reducers
        albums: albumsReducer,
        player: playerReducer,
        artists: artistReducer,
        user: userReducer
    }
})

export default store