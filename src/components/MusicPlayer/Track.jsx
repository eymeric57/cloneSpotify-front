import React from 'react'
import { ALBUM_URL, IMAGE_URL } from '../../constants/apiConstant';
import { selectArtistData } from '../../redux/artist/artistSelector';
import { useSelector } from 'react-redux';

const Track = ({ isPlaying, isActive, activeSong, currentAlbum, artist = 'artiste inconnu' }) => {

  const { artistDetail } = useSelector(selectArtistData)
  //on déclare nos constantes
  const imgPath = currentAlbum?.imagePath
  
  ?`${ALBUM_URL}/${currentAlbum?.imagePath}`
  : activeSong?.album?.imagePath
  ? `${ALBUM_URL}/${activeSong?.album?.imagePath}`
  : `${IMAGE_URL}/album.png`
  const title = activeSong?.title ?? 'Musique sans titre';
  const albumName = currentAlbum?.title ?? 'inconnu';
  const artistName = 
  currentAlbum?.artist?.name //on regarde si on a un artiste dans l'album
    ? currentAlbum?.artist?.name //si oui on retourne le nom
    : artistDetail?.name //si non on regarde si on a un artiste dans le détail de l'artiste
      ? artistDetail?.name // si oui on retourne le nom
       // si non on retourne 'artiste inconnu'
        :activeSong?.artist?.name 
        ? activeSong?.artist?.name 
        : artist
       

  return (
    <div className='flex flex-1 items-center justify-start'>
      <div className={`${isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''} hidden sm:block h-16 w-16 mr-4 `}>
        <img
          src={imgPath}
          alt={`Image de l'album ${albumName}`}
          className='rounded-full'
        />
      </div>
      <div className='w-[50%]'>
        <p className='truncate text-white font-bold text-lg'>
          {title}
        </p>
        <p className='truncate text-gray-500'>
          {artistName}
        </p>
      </div>
    </div>
  )
}

export default Track