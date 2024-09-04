import React, { useEffect, useRef } from 'react'
import { MUSIC_URL } from '../../constants/apiConstant';

const Player = ({ activeSong, volume, isPlaying, seekTime, repeat, currentIndex, onEnded, onTimeUpdate, onLoadedData }) => {

  const ref = useRef(null);

  if (ref.current) {
    if (isPlaying) {
      ref.current.play(); //permet de lancer la musique dans le player
    } else {
      ref.current.pause(); //permet de mettre en pause la musique dans le player
    }
  }

  useEffect(() => {
    ref.current.volume = volume; //permet d'affilier le volume au player
  }, [volume])

  useEffect(() => {
    ref.current.currentTime = seekTime; //permet de changer la position de la barre de lecture
  }, [seekTime])

  return (
    <audio
      src={`${MUSIC_URL}/${activeSong?.filePath}`}
      ref={ref}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
  )
}

export default Player