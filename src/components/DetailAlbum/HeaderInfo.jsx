import React from 'react'
import { ALBUM_URL, ARTIST_URL } from '../../constants/apiConstant'
import { Link } from 'react-router-dom';

const HeaderInfo = ({ dataAlbum }) => {
  //on récupère la photo de l'artiste si elle existe sinon on affiche la photo de l'album
  const imgPath = dataAlbum?.artist?.imagePath
    ? `${ARTIST_URL}/${dataAlbum?.artist?.imagePath}`
    : `${ALBUM_URL}/${dataAlbum?.imagePath}`;

  //on récupère l'année de la date de sortie
  const releaseDate = dataAlbum?.releaseDate ? new Date(dataAlbum?.releaseDate).getFullYear() : 'date inconnue'

  //on récupère le nombre de pistes de l'album
  const nbTitle = () => {
    if (dataAlbum?.songs?.length == 1) {
      return `${dataAlbum?.songs?.length} titre`
    } else if (dataAlbum?.songs?.length > 1) {
      return `${dataAlbum?.songs?.length} titres`
    } else {
      return 'Pas de titre'
    }
  }

  //Mini composant pour afficher le point separateur
  const Dot = () => (
    <p>&#8226;</p>
  )

  //traitement de la durée total de l'album hh:mm:ss ou mm:ss
  const durationAlbum = () => {
    //on va calculer le nombre de seconde pour tous les titres
    const totalSecond = dataAlbum?.songs && dataAlbum?.songs.map(function (titre) {
      return parseInt(titre.duration)
    }).reduce(function (a, b) {
      return a + b
    })

    //on va formater les secondes en heure, en minute et en secondes
    const hours = Math.floor(totalSecond / 3600);
    const minutes = String(Math.floor((totalSecond % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSecond % 60).padStart(2, '0');

    //on va maintenant retourner une string sous la forme hh:mm:ss ou mm:ss
    return hours > 0
      ? `${hours}h ${minutes}min ${seconds}s`
      : `${minutes}min ${seconds}s`

  }

  return (
    <div className='flex items-center flex-wrap'>
      <Link to={`/artist-detail/${dataAlbum?.artist?.id}`}>
        <img
          src={imgPath}
          alt={`image de l'artiste ${dataAlbum?.artist?.name} ?? Artiste inconnu`}
          className='w-10 h-10 rounded-full object-cover mr-2'
        />
      </Link>
      <p className='truncate font-bold text-sm lg:text-base p-1'>{dataAlbum?.artist?.name ?? 'Artiste inconnu'}</p>
      <Dot />
      <p className='truncate font-bold text-sm lg:text-base p-1'>{releaseDate}</p>
      <Dot />
      <p className='truncate font-bold text-sm lg:text-base p-1'>{nbTitle()}</p>
      <Dot />
      <p className='truncate font-bold text-sm lg:text-base p-1'>{dataAlbum?.songs?.length > 0 ? durationAlbum() : 'pas de titre'}</p>
    </div>

  )
}

export default HeaderInfo