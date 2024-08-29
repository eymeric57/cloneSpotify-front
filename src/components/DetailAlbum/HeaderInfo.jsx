import React from 'react'
import { ALBUM_URL, ARTIST_URL } from '../../constants/apiConstant'
import { Link } from 'react-router-dom';

const HeaderInfo = ({dataAlbum}) => {
    const imgPath = dataAlbum?.artist?.imagePath
    ? `${ARTIST_URL}/${dataAlbum?.artist?.imagePath}`
    : `${ALBUM_URL}/${dataAlbum?.imagePath}`;

    //on récupére l'anne de la date de sortie 
    const releaseDate = new Date(dataAlbum?.releaseDate).getFullYear() ?? 'date inconnue';

    const nbTitle = () => {
        if(dataAlbum?.songs?.length ==1){
            return `${dataAlbum?.songs?.length} titre`
        }else if (dataAlbum?.songs?.length > 1){
            return `${dataAlbum?.songs?.length} titres`
        }else {
            return 'aucun titre'
        }
    }

    //Mini composant pour afficher le point separateur 
    const Dot = () => (
        <span>&#8226;</span>
    )

    // traitement de la durée total de l'album 
    const durationAlbum = () => {
       //on va calculer le nombre de saconde pour tous les titres 
       const totalSecond = dataAlbum?.songs && dataAlbum?.songs.map(function(titre){
            return parseInt(titre.duration)
       }).reduce(function(a,b){
            return a + b
        })

        //on va formater les secondes en heure, en minute et en secondes
        const hours = Math.floor(totalSecond / 3600);
        const minutes = String(Math.floor((totalSecond % 3600) / 60)).padStart(2, '0');
        const secondes = String(totalSecond % 60).padStart(2, '0') ;


    //on va retourner une string sous la forme hh:mm:ss ou mm:ss

return hours > 0
?`${hours} h ${minutes} min ${secondes}s`
: `${minutes} min ${secondes}s`



    }


    


  return (
    <div className='flex flex-wrap items-center'>
        <Link to={'#'}>
        <img src={imgPath} 
        alt={`image d el'artiste${dataAlbum?.artist?.name}?? Artiste inconnu` } 
        className='w-10 h-10 rounded-full object-cover mr-3 border-solid border-2 border-white' />
        </Link>
        <p className='font-bold text-base p-1'>{dataAlbum?.artist?.name ?? 'Artiste inconnu'}</p>
        <Dot />
        <p className='font-bold text-base p-1'>{releaseDate}</p>
        <Dot />
        
        <p className='font-bold text-base p-1'>{nbTitle()}</p>
        <Dot />
        <p className='font-bold text-base p-1'>{dataAlbum?.songs?.length > 0 ?durationAlbum() : 'pas de titre'}</p>
    
        </div>

  )
}


export default HeaderInfo