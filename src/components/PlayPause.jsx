import React from 'react'
import { BsPauseCircleFill, BsPlayCircleFill } from 'react-icons/bs'

const PlayPause = ({
  size = '60px', // permet de définir la taille du bouton (par defaut 60px)
  isPlaying, // permet de savoir si la musique est en cours de lecture ou non
  songs, //tableau chansons
  activeSong, //chanson en cours de lecture
  handlePause, //méthode qui permet de mettre en pause la musique
  handlePlay, //méthode qui permet de jouer la musique
  index //index de la chanson dans le tableau
}) => {
  return (
    //on check si on est en mode play && 
    // si le titre de la chanson en cours de lecture (activeSong) correspond au titre de la chanson dans le tableau(songs) à l'index donné (index)
    isPlaying && activeSong && songs && activeSong?.title === songs[index]?.title ?
      //si vrai: on retourne l'icone pause avec la méthode handlePause
      <BsPauseCircleFill
        size={size}
        className='text-green shadow-md cursor-pointer'
        onClick={handlePause}
      />
      :
      // si faux : on retourne l'icone play avec la méthode handlePlay
      <BsPlayCircleFill
        size={size}
        className='text-green shadow-md cursor-pointer'
        onClick={handlePlay}
      />

  )
}

export default PlayPause