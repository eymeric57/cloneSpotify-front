import React from "react";
import { ALBUM_URL } from "../../constants/apiConstant";

const Track = ({ isActive, isPlaying, activeSong, currentAlbum }) => {
  //on déclare nos constantes
  const imgPath = `${ALBUM_URL}/${currentAlbum?.imagePath}`;
  const title = activeSong?.title ?? "Musique sans titre";
  const artist = currentAlbum?.artist.name ?? "Artiste inconnu";
  const albumName = currentAlbum?.title ?? "Album inconnu";

  return (
    <div className="flex flex-1 items-center justify-start mt-1">
      <div
        className={`${
          isPlaying && isActive ? "animate-[spin_2.5s_linear_infinite]" : ""
        } hidden sm:block h-16 w-16 mr-4 rounded-full border-2 border-white `}
>
        <img
          src={imgPath}
          alt={`Image de l'album ${albumName}`}
          className="rounded-full "
        ></img>
      </div>
      <div className="w-[50%] ">
        <p className="truncate text-white font-bold text-lg">
          {title}
        </p>
        <p className="truncate text-gray-500">
          {artist}
        </p>


      </div>
      
    </div>
  );
};

export default Track;
