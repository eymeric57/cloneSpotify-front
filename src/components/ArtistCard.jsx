import React from "react";
import { ARTIST_URL, IMAGE_URL } from "../constants/apiConstant";
import { Link } from "react-router-dom";

const ArtistCard = ({ dataArtist }) => {
  //on declare notre constante d'image
  const imgPath = dataArtist?.imagePath
    ? `${ARTIST_URL}/${dataArtist?.imagePath}`
    : `${IMAGE_URL}/artist.png`;

  const artistId = dataArtist?.id ?? 0;
  const name = dataArtist?.name ?? "Artiste inconnu";

  return (
    <Link to={`/artist-detail/${artistId}`}>
      <div className="flex flex-col justify-center items-center bg-white01 rounded-lg shadow-lg p-4">
        <div className="flex flex-col justify-center items-center">
          <img
            src={imgPath}
            alt={`Image de l'artiste ${name}`}
            className="rounded-full w-40 h-40 object-cover"
          />
          <h3 className="text-white font-bold text-xl text-center mt-2">
            {name}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default ArtistCard;
