import { createSlice } from "@reduxjs/toolkit"

//on va initialiser nos states dans une constante
const initialState = {
  activeSong: {}, //chanson en cours de lecture
  currentAlbum: [], //album en cours de lecture
  currentIndex: 0, //index de la chanson en cours de lecture dans son tableau
  currentSongs: [], //tableau de chansons en cours de lecture
  isActive: false, //flag pour savoir si le player est activé
  isPlaying: false // flag pour savoir si la musique est en cours de lecture
}

//création du slice pour la gestion du player
const playerSlice = createSlice({
  //on lui donne un nom
  name: "player",
  initialState,
  reducers:{
    //tout ce qu'on stock lorsqu'on active une chanson
    setActiveSong: (state, action) => {
      //stockage de la chanson en lecture dans activeSong
      state.activeSong = action.payload?.songs[action.payload?.index];
      //stockage du tableau de chansons dans currentSongs
      state.currentSongs = action.payload?.songs;
      //stockage de l'index de la chanson en lecture dans currentIndex
      state.currentIndex = action.payload?.index;
      //stockage de l'état du player à true
      state.isActive = true;
    },

    //récupérartion des données de l'album
    setActiveAlbum: (state, action) => {
      state.currentAlbum = action.payload?.data;
    },

    //pour avancer le liste de lecture
    nextSong: (state, action) => {
      //on récupère la chanson suivante dans le tableau de chanson à l'index suivant
      state.activeSong = state.currentSongs[action.payload];
      //on stocke le nouvel index
      state.currentIndex = action.payload;
      //on active le player
      state.isActive = true;
    },

    //pour reculer le liste de lecture
    prevSong: (state, action) => {
      //on récupère la chanson suivante dans le tableau de chanson à l'index suivant
      state.activeSong = state.currentSongs[action.payload];
      //on stocke le nouvel index
      state.currentIndex = action.payload;
      //on active le player
      state.isActive = true;
    },

    //pour mettre en play ou pause la musique
    playPause: (state, action) => {
      state.isPlaying = action.payload;
    }
  }
});

//on exporte les actions
export const { setActiveSong, setActiveAlbum, nextSong, prevSong, playPause } = playerSlice.actions;
// export du reducer
export default playerSlice.reducer;