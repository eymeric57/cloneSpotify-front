import React from 'react'
import { BsPauseCircleFill, BsPlayCircleFill } from 'react-icons/bs'

const PlayPause = ({
    size = '60px',//permet de définir la taille du btn par defaut
    isPlaying,// permet de savoir si la musique est en cours de lecture ou non
    songs,// tableau chanson 
    activeSong,//chanson en cours de lecture
    handlePause,//permet de mettre en pause la musique
    handlePlay,//permet de lancer la musique
    index // index de la chanson en cours de lecture
}) => {
  return (
    //on checked si ont est en mode play et si le titre en cours d electure (activeSong) corespond au titre de la chanson dans le tableau(songs)l'index donné (index)
    isPlaying && activeSong?.title === songs[index]?.title 
    ?
    //si vrai : ont retourne l'icone pause avec la méthode handlePause
    <BsPauseCircleFill
     size={size} 
     className="text-green shadow-md cursor-pointer"
     onClick={handlePause}/>
     :
     <BsPlayCircleFill
     size={size} 
     className="text-green shadow-md cursor-pointer"
     onClick={handlePlay}/>

    )

  
}

export default PlayPause