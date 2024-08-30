import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextSong, playPause } from "../../redux/player/playerSlice";
import Track from "./Track";
import Controles from "./Controles";
import SeekBar from "./SeekBar";
import Player from "./Player";
import VolumeBar from "./VolumeBar";

const MusicPlayer = () => {
  //on va récupérer les données de notre slice player
  const {
    activeSong,
    currentSong,
    currentAlbum,
    isActive,
    currentIndex,
    isPlaying,
  } = useSelector((state) => state.player);

  //on va déclarer nos fonctions
  const [shuffle, setShuffle] = useState(false); //pour le mode aleatoire
  const [repeat, setRepeat] = useState(false); //pour le mode repeat
  const [volume, setVolume] = useState(0.3); //pour le volume
  const [duration, setDuration] = useState(0); //pour la duree de la chanson
  const [seekTime, setSeekTime] = useState(0); //pour recupérer la position de lecture si ont deplace le cursor de lecture manuellement
  const [appTime, setAppTime] = useState(0); //pour le temps actuel de la chanson

  //on recfupére les hooks
  const dispatch = useDispatch();

  useEffect(() => {
    //si le store contient un tableau de chanson on dispatch playPause a (true)
    if (currentSong?.length) dispatch(playPause(true));
  }, [currentIndex]); // si currentIndex change => on reload le composant

  //méthode pour avancer a la chanson suivante 
  const handleNextSong = () => {
    //si ont est pas en mode aléatoire 
    if(!shuffle){
      dispatch(nextSong((currentIndex + 1) % currentSong.length));
    }else {
      //si on est en mode aleatoire
      dispatch(nextSong(Math.floor(Math.random() * currentSong.length)));

    }
  }

  const handlePrevSong = () => {
    if(currentIndex === 0){
      // si l'index est a 0 ont doit récupérer le dernier elem du tableau 
      dispatch(nextSong(currentSong.length - 1));
      
  }else if (shuffle) {
    //si on est en mode aleatoire
    dispatch(nextSong(Math.floor(Math.random() * currentSong.length)));


  }else {
    //si on est pas en mode aleatoire
    dispatch(nextSong(currentIndex - 1));

  }
}

  const handlePlayPause = () => {
    //si ont a aucune chanson active on ne fait rien
    if (!isActive) return;
    isPlaying ? dispatch(playPause(false)) : dispatch(playPause(true));


  }

  return (
    <div className="relative sm:px-12 px-8 w-full flex items-center justify-between">
      <Track
        isPlaying={isPlaying}
        isActive={isActive}
        currentAlbum={currentAlbum}
        activeSong={activeSong}
      />
      <div className="flex-1 flex flex-col items-center justify-center">
        <Controles
        isPlaying={isPlaying}//savoir si le titre est en cours de lecture
        isActive={isActive}//savoir si le player est actif ou non
        currentSong={currentSong}//tableau chanson en cours de lecture
        handleNextSong={handleNextSong}//méthode pour avancer a la chanson suivante
        handlePlayPause={handlePlayPause}//méthode pour lancer ou mettre en pause la chanson
        handlePrevSong={handlePrevSong}//méthode pour retourner a la chanson precedente
        shuffle={shuffle}//pour le mode aleatoire
        setShuffle={setShuffle}//pour le mode aleatoire
        repeat={repeat}//pour le mode repeat
        setRepeat={setRepeat}//pour le mode repeat

        />
         <SeekBar
                    value={appTime} // valeur de la barre de lecture
                    min={0} // valeur minimum
                    max={duration} // valeur maximum
                    onInput={(event)=>setSeekTime(event.target.value)} // methode pour recuperer la position de la barre
                    setSeekTime={seekTime} // pour changer la position de la barre de lecture
                    appTime={appTime} // position reel de la barre de lecture
                />
                <Player
                    activeSong={activeSong} // chanson active
                    volume={volume} // volume
                    isPlaying={isPlaying} // savoir si le titre est en cours de lecture
                    seekTime={seekTime} // pour changer la position de la barre de lecture
                    repeat={repeat} // état pour le mode repetition
                    currentIndex={currentIndex} // index de la chanson en cours de lecture
                    onEnded={handleNextSong} // methode pour avancer a la chanson suivante
                    onTimeUpdate={(event)=>setAppTime(event.target.currentTime)} // methode pour recuperer le temps de la musique
                    onLoadedData={(event)=>setDuration(event.target.duration)} // methode pour recuperer la durée de la musique
                />

      </div>
                <VolumeBar
                    value={volume} // valeur de la barre de lecture
                    max={1} // valeur maximum
                    min={0} // valeur minimum
                    onChange={(event) => setVolume(event.target.value)}
                    setVolume={setVolume} // methode pour changer la valeur du volume
                    />
    </div>
  );
};

export default MusicPlayer;
