import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthContext } from "../contexts/AuthContext";
import { fetchUserPlaylists } from "../redux/user/userSlice";
import { selectUserData } from "../redux/user/userSelector";
import PlayPause from "./PlayPause";
import {
  playPause,
  setActiveAlbum,
  setActiveSong,
} from "../redux/player/playerSlice";
import { FaPencil, FaRegTrashCan } from "react-icons/fa6";
import PopupUpdatePlaylist from "./PopupUpdatePlaylist";
import PageLoader from "./Loader/PageLoader";
import { API_URL } from "../constants/apiConstant";
import axios from "axios";

const PlaylistView = ({ dataPlaylist }) => {
  const dispatch = useDispatch();
  const [isHover, setIsHover] = useState(-1);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [dataOnePlaylist, setDataOnePlaylist] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { userId } = useAuthContext();

  const { loading } = useSelector(selectUserData);
  const { isPlaying, activeSong } = useSelector((state) => state.player);

  //méthode lorsque l'on met pause
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  //méthode lorsqu'on met play
  const handlePlayClick = (playlist) => {
    console.log("PLAYLIST", playlist);

    const songs = playlist?.songs;
    const data = playlist?.songs[0]?.album;
    const index = 0;
    dispatch(setActiveSong({ songs, data, index }));
    dispatch(setActiveAlbum({ data }));
    dispatch(playPause(true));
  };

  //méthode pour supprimer une playlist
  const handleDeletePlaylist = async (id) => {
    try {
      setIsLoading(true);
      const response = await axios.delete(`${API_URL}/playlists/${id}`);
      if (response.status === 204) {
        setIsLoading(false);
        dispatch(fetchUserPlaylists(userId));
      } else {
        setIsLoading(false);
        console.log("Erreur lors de la suppression de la playlist");
      }
    } catch (error) {
      console.log(`Erreur lors de la suppression de la playlist : ${error}`);
      setIsLoading(false);
    }
  };

  return loading ? (
    <PageLoader />
  ) : (
    <div className="flex flex-col">
      <div className="overflow-x-auto min-w-full py-2 sm:px-6 lg:px-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    #
                  </th>
                  <th scope="col" className="px-6 py-4">
                    TITRE
                  </th>
                  <th scope="col" className="px-6 py-4">
                    NB CHANSONS
                  </th>
                  <th scope="col" className="px-6 py-4">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataPlaylist?.length > 0 ? (
                  dataPlaylist.map((playlist, index) => {
                    const nbSong = playlist?.songs?.length;
                    const title = playlist?.title ?? "Aucun titre";
                    const dataSongs = playlist?.songs;

                    return (
                      <tr
                        key={index}
                        className="border-b transition duration-300 ease-in-out hover:bg-gradient-to-b from-green_top to-transparent"
                        onMouseEnter={() => setIsHover(index)}
                        onMouseLeave={() => setIsHover(-1)}
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium m-1">
                          {/* on va utiliser isHover pour afficher le bouton play */}
                          {isHover !== index && `#${index + 1}`}
                          {isHover === index && nbSong == 0 && `#${index + 1}`}
                          {isHover === index && nbSong > 0 && (
                            <PlayPause
                              size="16px"
                              songs={dataSongs}
                              handlePause={handlePauseClick}
                              handlePlay={() => handlePlayClick(playlist)}
                              isPlaying={isPlaying}
                              activeSong={activeSong}
                              index={0}
                            />
                          )}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium m-1">
                          {title}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium m-1">
                          {nbSong}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium m-1">
                          <div className="flex items-center">
                            <FaPencil
                              size={20}
                              className="m-2 text-orange-300 hover:text-orange-500"
                              onClick={() => {
                                setDataOnePlaylist(playlist);
                                setIsPopupOpen(true);
                              }}
                            />
                            <FaRegTrashCan
                              size={20}
                              className="m-2 text-red-300 hover:text-red-500"
                              onClick={() => {
                                const confirmLogout = window.confirm(
                                  `Voulez-vous vraiment suprrimer ${playlist.title} ?`
                                );
                                if (confirmLogout)
                                  handleDeletePlaylist(playlist.id);
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="3">Aucune playlist disponible</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <PopupUpdatePlaylist
        isOpen={isPopupOpen}
        setIsOpen={setIsPopupOpen}
        dataPlaylist={dataOnePlaylist}
      />
    </div>
  );
};

export default PlaylistView;
