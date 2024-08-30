import React from "react";
import { useSelector } from "react-redux";
import { selectAlbumsData } from "../../redux/albums/albumSelector";
import AlbumCard from "../AlbumCard";
import ArtistCard from "../ArtistCard";

const SearchView = () => {
  //on récupére les infos du slice album
  const { searchAlbum, searchArtist, searchTitle } =
    useSelector(selectAlbumsData);
  //on récupére les infos du slice player
  const { isPlaying, activeSong } = useSelector((state) => state.player);

  //on redéfinit des const pour récupérer les data de chaque state
  const dataAlbum = searchAlbum["hydra:member"];
  const dataArtist = searchArtist["hydra:member"];
  const dataTitle = searchTitle["hydra:member"];
  return (
    <>
      {dataAlbum &&
        dataAlbum?.length === 0 &&
        dataArtist &&
        dataArtist?.length === 0 &&
        dataTitle &&
        dataTitle?.length === 0 && (
          <h2 className=" font-bold text-3xl text-left text-white mt-10 mb-4">
            Aucun résultat trouvé
          </h2>
        )}
      {/*cas ou il toruve un album */}
      {dataAlbum && dataAlbum?.length > 0 ? (
        <h2 className="font-bold text-3xl text-left text-white mt-10 mb-4">
          Résultat des albums
        </h2>
      ) : null}
      <div className="flex flex-wrap">
        {dataAlbum &&
          dataAlbum?.map((data, index) => (
            <div key={`album_${index}`} className="p-3 m-3">
              <AlbumCard
                data={data}
                index={0}
                songs={data?.songs}
                isPlaying={isPlaying}
                activeSong={activeSong}
                dataAlbum={dataAlbum}
              />
            </div>
          ))}
      </div>
      {/* cas ou il toruve un artist */}
      {dataArtist && dataArtist?.length > 0 ? (
        <h2 className="font-bold text-3xl text-left text-white mt-10 mb-4">
          Résultat des artiste
        </h2>
      ) : null}
      {dataArtist &&
        dataArtist?.map((data, index) => (
          <div key={`album_${index}`} className="p-3 m-3">
            <ArtistCard dataArtist={data} />
          </div>
        ))}

         {/* cas ou il trouve un titre */}
      {dataTitle && dataTitle?.length > 0 ? (
        
        <h2 className="font-bold text-3xl text-left text-white mt-10 mb-4">
          Résultat des Titres
        </h2>
      ) : null}
      {dataTitle &&
        dataTitle?.map((data, index) => (
          <div key={`titre_${index}`} className="p-3 m-3">
           <AlbumCard 
            data={data}
                index={0}
                songs={data?.title}
                isPlaying={isPlaying}
                activeSong={activeSong}
                dataAlbum={dataAlbum}/>
          </div>
        ))}
    </>
  );
};

export default SearchView;
