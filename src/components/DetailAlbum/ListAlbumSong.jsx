import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { playPause, setActiveAlbum, setActiveSong } from '../../redux/player/playerSlice'
import { BiTime } from 'react-icons/bi'
import { tableIcon } from '../../constants/appConstant'
import PlayPause from '../PlayPause'
import { IoMdAdd } from 'react-icons/io'

const ListAlbumSong = ({ dataAlbum }) => {
  //on déclare nos constante
  const data = dataAlbum // données de l'album
  const songs = dataAlbum?.songs // tableau des chansons de l'album
  //on déclare les states
  const [isHover, setIsHover] = useState(-1)
  //on récupère les données du store
  const { isPlaying, activeSong } = useSelector(state => state.player)
  //on récupère les hooks
  const dispatch = useDispatch()

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

  //méthode pour ajouter une chanson à la playlist
  const addPlaylist = () => {
    console.log('add playlist');
    //TODO : prévoir la mécanique
  }

  return (
    <div className='flex flex-col'>
      <div className='overflow-x-auto min-w-full py-2 sm:px-6 lg:px-8'>
        <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
          <div className='overflow-hidden'>
            <table className='min-w-full text-left text-sm font-light'>
              <thead className='border-b font-medium'>
                <tr>
                  <th scope='col' className='px-6 py-4'>#</th>
                  <th scope='col' className='px-6 py-4'>TITRE</th>
                  <th scope='col' className='px-6 py-4'></th>
                  <th scope='col' className='px-6 py-4'>
                    <BiTime style={tableIcon} />
                  </th>
                </tr>
              </thead>
              <tbody>
                {songs?.length > 0
                  ? songs.map((song, index) => {
                    //formattage du temps pour les titres
                    const minutes = Math.floor(song.duration / 60);
                    const secondes = Math.floor(song.duration % 60);
                    //on retourne une string au format mm:ss
                    const duration = secondes < 10
                      ? `${minutes}:0${secondes}`
                      : `${minutes}:${secondes}`;

                    return (
                      <tr
                        key={index}
                        className='border-b transition duration-300 ease-in-out hover:bg-gradient-to-b from-green_top to-transparent'
                        onMouseEnter={() => setIsHover(index)}
                        onMouseLeave={() => setIsHover(-1)}
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium m-1">
                          {/* on va utiliser isHover pour afficher le bouton play */}
                          {isHover !== index && `#${index + 1}`}
                          {isHover === index && <PlayPause
                            size='16px'
                            songs={songs}
                            handlePause={handlePauseClick}
                            handlePlay={() => handlePlayClick(index)}
                            isPlaying={isPlaying}
                            activeSong={activeSong}
                            index={index}
                          />}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium m-1">
                          {song.title}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium m-1">
                          {isHover !== index && <div style={tableIcon}></div>}
                          {isHover === index &&
                            <IoMdAdd
                              className='cursor-pointer'
                              style={tableIcon}
                              onClick={() => addPlaylist()}
                            />}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium m-1">
                          <div className='flex'>
                            {duration}
                          </div>
                        </td>
                      </tr>
                    )
                  })
                  : (
                    <tr>
                      <td colSpan="3">Aucune chanson disponible</td>
                    </tr>
                  )

                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListAlbumSong