import React from 'react'
import { ALBUM_URL } from '../constants/apiConstant';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { playPause, setActiveAlbum, setActiveSong } from '../redux/player/playerSlice';
import PlayPause from './PlayPause';

const AlbumCard = ({ data, index, songs, isPlaying, activeSong, artist='inconnu' }) => {
  //on récupère le hook dispatch de react-redux
  const dispatch = useDispatch();

  //constante pour récupérer l'image de l'album
  const imgPath = `${ALBUM_URL}/${data.imagePath}`;
  //on redefinit des constantes pour les données de l'albums
  
  const artistName = data?.artist?.name ?? artist
  const albumName = data?.title ?? 'Album inconnu'
  const albumId = data?.id ?? 0

  //méthode lorsque l'on met pause
  const handlePauseClick = () => {
    dispatch(playPause(false));
  }

  //méthode lorsqu'on met play
  const handlePlayClick = (index) => {
    dispatch(setActiveSong({ songs, data, index }));
    dispatch(setActiveAlbum({ data }));
    dispatch(playPause(true));
  }

  return (
    <div className='flex flex-col w-[250px] p-4 bg-white_01 hover:bg-white_05 transition-all ease-out duration-500 animate-slideup rounded-lg cursor-pointer group'>
      <div className='relative w-full flex flex-col'>
        <Link to={`/detail/${albumId}`}>
          <img
            src={imgPath}
            alt={`image de l'album ${albumName}`}
            className='card-sh rounded-lg object-cover h-52 w-52'
          />
        </Link>
        {/* on place le bouton play/pause ici */}
        <div className={`absolute ${activeSong?.title === songs[index]?.title ? 'flex' : 'hidden'} group-hover:flex right-3 bottom-5`}>
          <div className='group-hover:animate-slideup2 bg-black outline-none rounded-full group-hover:duration-75 overflow-hidden'>
            <PlayPause
              songs={songs}
              handlePause={handlePauseClick}
              handlePlay={() => handlePlayClick(index)}
              isPlaying={isPlaying}
              activeSong={activeSong}
              index={index}
              data={data}
            />
          </div>
        </div>
        <Link to={`/detail/${albumId}`}>
          <div className='mt-4 flex flex-col'>
            <p className='text-white text-xl truncate font-bold'>{albumName}</p>
            <p className='text-white text-sm truncate'>{artistName}</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default AlbumCard