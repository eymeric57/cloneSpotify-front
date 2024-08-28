import { createSlice } from "@reduxjs/toolkit";

//on va initialiser nos states dans une constante
const initialState = {
  activeSong: {}, //chanson en cours de lecture
  currentAlbum: [], // album en cours de lecture
  currentIndex: 0, //index de la chanson en cours de lecture
  currentSong: [],
  isPlaying: false, //indique si la musique est en cours de lecture ou non
  isActive: false, //indique si la musique est en mode aleatoire ou non
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setActiveSong: (state, action) => {
      //stockage de la chanson en lecture dans activesong
      state.activeSong = action.payload?.songs[action.payload?.index];

      state.currentSong = action.payload?.songs;

      state.currentIndex = action.payload?.index;

      state.isActive = true;
    },
    // tout ce qu'on stack lorsqu'on active une chanson
    setActiveSong: (state, action) => {
      state.activeSong = action.payload?.songs[action.payload?.index];
      // stackage du tableau de chansons dans currentSong
      state.currentSong = action.payload?.songs;
      // stackage de l'index de la chanson en lecture dans currentIndex
      state.currentIndex = action.payload?.index;
      // stockage de l'etat du player a true
      state.isActive = true;
    },

    // recuperation des donnees de l'album
    setActiveAlbum: (state, action) => {
      state.currentAlbum = action.payload?.data;
    },

    // pour avancer la liste de lecture
    nextSong: (state, action) => {
      // on recupere la chanson suivante dans le tableau de chanson a l'index suivant
      state.activeSong = state.currentSong[action.payload];
      // on stocke le nouvel index
      state.currentIndex = action.payload;
      state.isActive = true;
    },
    prevSong: (state, action) => {
        // on recupere la chanson suivante dans le tableau de chanson a l'index suivant
        state.activeSong = state.currentSong[action.payload];
        // on stocke le nouvel index
        state.currentIndex = action.payload;
        state.isActive = true;
      },
      playPause: (state, action) => {
        state.isPlaying = action.payload;
      },
  },
});

export const { setActiveSong, setActiveAlbum, nextSong, prevSong, playPause } =
  playerSlice.actions;

  export default playerSlice.reducer

