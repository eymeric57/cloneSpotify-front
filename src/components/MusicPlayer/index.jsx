import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nextSong, playPause, prevSong } from '../../redux/player/playerSlice'
import Track from './Track'
import Controls from './Controls'
import SeekBar from './SeekBar'
import Player from './Player'
import VolumeBar from './VolumeBar'

const MusicPlayer = () => {
  //on va récupérer toutes les données de notre slice player
  const { activeSong, currentSongs, currentAlbum, currentIndex, isActive, isPlaying } = useSelector(state => state.player)

  //on va déclarer nos states
  const [shuffle, setShuffle] = useState(false) //etat pour le mode aléatoire
  const [repeat, setRepeat] = useState(false) //etat pour le mode répétition
  const [volume, setVolume] = useState(0.3) //etat pour le volume
  const [duration, setDuration] = useState(0) //pour la durée de la chanson
  const [seekTime, setSeekTime] = useState(0) //pour récupérer la position de la barre (si on deplace le curseur de lecture manuellement)
  const [appTime, setAppTime] = useState(0) // temps actuel de la chanson

  //on récupère les hooks 
  const dispatch = useDispatch();

  useEffect(() => {
    //si le store contient un tableau de chanson on dispatch playPause a true
    if (currentSongs.length > 0) dispatch(playPause(true))
  }, [currentIndex]) //si currentIndex change => on reload le composant

  //méthode pour mettre pause ou play
  const handlePlayPause = () => {
    //si on a aucune chanson active on return
    if (!isActive) return;
    //on dispatch playPause avec l'inverse de isPlaying
    // isPlaying ? dispatch(playPause(false)) : dispatch(playPause(true))
    dispatch(playPause(!isPlaying))
  }

  //méthode pour avancer a la chanson suivante
  const handleNextSong = () => {
    //si on n'est pas en mode aléatoire
    if (!shuffle) {
      dispatch(nextSong((currentIndex + 1) % currentSongs.length))
    } else {
      dispatch(nextSong(Math.floor(Math.random() * currentSongs.length)))
    }
  }

  //méthode pour revenir a la chanson précédente
  const handlePrevSong = () => {
    if (currentIndex === 0) {
      //si l'index est a 0 on doit récuperer le dernier element du tableau
      dispatch(prevSong(currentSongs.length - 1))
    } else if (shuffle) {
      dispatch(prevSong(Math.floor(Math.random() * currentSongs.length)))
    } else {
      dispatch(prevSong(currentIndex - 1))
    }
  }

  return (
    <div className='relative sm:px-12 px-8 w-full flex items-center justify-between'>
      <Track
        isPlaying={isPlaying}
        isActive={isActive}
        currentAlbum={currentAlbum}
        activeSong={activeSong}
      />
      <div className='flex flex-1 flex-col items-center justify-center'>
        <Controls
          isPlaying={isPlaying} //savoir si le titre est en cours de lecture
          currentSongs={currentSongs} //tableau de chanson en cours de lecture
          handlePlayPause={handlePlayPause} //méthode pour mettre pause ou play
          handleNextSong={handleNextSong} //méthode pour avancer a la chanson suivante
          handlePrevSong={handlePrevSong} //méthode pour revenir a la chanson
          shuffle={shuffle} //etat pour le mode aléatoire
          setShuffle={setShuffle} //setter pour le mode aléatoire
          repeat={repeat} //etat pour le mode répétition
          setRepeat={setRepeat} //setter pour le mode répétition
        />
        <SeekBar 
          value={appTime} //valeur de la barre de lecture
          min={'0'} //valeur minimum
          max={duration} //valeur maximum
          onInput={(event)=> setSeekTime(event.target.value)} //pour récupérer la position de la barre de lecture
          setSeekTime={setSeekTime }//pour changer la position de la barre de lecture
          appTime={appTime} //position reel de la barre de lecture
        />
        <Player 
          activeSong={activeSong} //chanson en cours de lecture
          volume={volume} //volume de la musique
          isPlaying={isPlaying} //savoir si le titre est en cours de lecture
          seekTime={seekTime} //position de la barre de lecture
          repeat={repeat} //etat pour le mode répétition
          currentIndex={currentIndex} //index de la chanson en cours de lecture
          onEnded={handleNextSong} //méthode pour avancer a la chanson suivante
          onTimeUpdate={(event)=> setAppTime(event.target.currentTime)} //pour récupérer le temps actuel de la chanson
          onLoadedData={(event)=> setDuration(event.target.duration)} //pour récupérer la durée de la chanson
        />
      </div>
      <VolumeBar 
        value={volume} //valeur du volume
        min="0" //valeur minimum
        max="1" //valeur maximum
        onChange={(event)=> setVolume(event.target.value)} //pour changer le volume
        setVolume={setVolume} //setter pour le volume
      />
    </div>
  )
}

export default MusicPlayer