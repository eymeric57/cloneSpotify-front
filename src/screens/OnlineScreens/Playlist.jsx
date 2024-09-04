import React, { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { styleIcon } from "../../constants/appConstant";
import PopupPlaylist from "../../components/PopupPlaylist";
import PlaylistView from "../../components/PlaylistView";
import { useDispatch, useSelector } from "react-redux";
import { useAuthContext } from "../../contexts/AuthContext";
import { fetchUserPlaylists } from "../../redux/user/userSlice";
import { selectUserData } from "../../redux/user/userSelector";

const Playlist = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const dispatch = useDispatch();
  const { userId } = useAuthContext();

  useEffect(() => {
    dispatch(fetchUserPlaylists(userId));
  }, [isPopupOpen, dispatch, userId]);

  const {userPlaylists} = useSelector(selectUserData);
 
  

  return (
    <div className={`${isPopupOpen ? "blur-lg" : ""} flex flex-col`}>
      {/* bouton pour créer la playlist */}
      <div className="flex justify-between items-center m-2">
        <h1 className="text-2xl font-bold">Vos Playlists</h1>
        <div
          className="flex bg-green_top hover:bg-green text-white px-4 py-2 rounded-md items-center cursor-pointer"
          onClick={() => setIsPopupOpen(true)}
        >
          <IoAdd style={styleIcon} />
          <span className="ml-2">Nouvelle playlist</span>
        </div>
      </div>
      {/* affichage de la popup */}
      <PopupPlaylist isOpen={isPopupOpen} setIsOpen={setIsPopupOpen} />
      <PlaylistView dataPlaylist={userPlaylists} />
    </div>
  );
};

export default Playlist;
