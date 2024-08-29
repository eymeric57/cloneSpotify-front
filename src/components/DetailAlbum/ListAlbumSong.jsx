import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  playPause,
  setActiveAlbum,
  setActiveSong,
} from "../../redux/player/playerSlice";
import { BiTime } from "react-icons/bi";
import { tableIcon } from "../../constants/appConstant";
import PlayPause from "../PlayPause";
import { IoMdAdd } from "react-icons/io";


const ListAlbumSong = ({ dataAlbum }) => {
  //on déclare nos constante
  const data = dataAlbum; //données de l'album
  const songs = dataAlbum?.songs;
  //on déclare les states
  const [isHover, setIsHover] = useState(-1);
  
  
  //on récupére les données du store
  const { isPlaying, activeSong } = useSelector((state) => state.player);
  //on récupére les hooks
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (index) => {
    dispatch(setActiveSong({ songs, data, index }));
    dispatch(setActiveAlbum({ data }));
    dispatch(playPause(true));
  };

  //méthode pour ajouter une chanson a la playlist
  const addPlayList = () => {
   
    /*TODO: prevoir la mecanique */
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto min-w-full py-2 sm:px-6 lg:px-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b  font-medium">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      #
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Titre
                    </th>
                    <th scope="col" className="px-6 py-4">
                        
                    </th>
                    <th scope="col" className="px-6 py-4"><BiTime style={tableIcon} /></th>
                  
                  </tr>
                </thead>

                <tbody>
                  {songs?.length > 0 ?
                    songs.map((song, index) => {
                      //formatage du temps pour les titres
                      const minute = Math.floor(song.duration / 60);
                      const secondes = Math.floor(song.duration % 60);
                      //on retourne une string au format minute: secondes
                      const duration =
                        secondes < 10
                          ? `${minute}:${secondes}0`
                          : `${minute}:${secondes}`;
                      return (
                        <tr
                          key={index}
                          className="border-b transition duration-300 ease-in-out hover:bg-gradient-to-b from-green_top to-transparent"
                          onMouseEnter={() => setIsHover(index)}
                          onMouseLeave={() => setIsHover(-1)}
                        >
                          <td className="whitespace-nowrap px-6 py-4 font-medium m-1">
                            {/*on va utiliser le isHover pour afficher le btn play */}
                            {isHover !== index && `#${index + 1}`}
                            {isHover === index && <PlayPause
                              size="16px"
                              songs={songs}
                              handlePause={handlePauseClick}
                              handlePlay={() => handlePlayClick(index)}
                              isPlaying={isPlaying}
                              activeSong={activeSong}
                              index={index}/>}
                            
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium m-1">
                           {song.title}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium m-1">
                            {isHover !== index && <div style={tableIcon}></div>}
                            {isHover === index && <IoMdAdd 
                            className="cursor-pointer" 
                            style={tableIcon}
                            onClick={() => addPlayList()}/>}
                          
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium m-1">
                            <div className="flex">{duration}</div>
                           
                          </td>
                        
                        </tr>
                      );
                    }):(
                        <tr>
                            <td colSpan={3}>Aucune chanson</td>
                        </tr>
                    )
                    }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListAlbumSong;
