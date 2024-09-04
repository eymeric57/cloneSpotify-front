import { configureStore } from "@reduxjs/toolkit";
import albumsReducer from "./albums/albumSlice";
import playerReducer from "./player/playerSlice";
import artistReducer from "./artist/artistSlice";
import userReducer from "./user/userSlice";

//on crée notre magasin de données
const store = configureStore({
  reducer: {
    // on declarera ici les reducers
    albums: albumsReducer,
    player: playerReducer,
    artists: artistReducer,
    users: userReducer
  }
})

export default store;