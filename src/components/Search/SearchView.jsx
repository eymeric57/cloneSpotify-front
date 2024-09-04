import React from 'react'
import { useSelector } from 'react-redux'
import { selectAlbumsData } from '../../redux/albums/albumSelector'
import { data } from 'autoprefixer';
import AlbumCard from '../AlbumCard';
import ArtistCard from '../ArtistCard';

const SearchView = () => {
  //on récupère les infos du slice album
  const { searchAlbum, searchArtist, searchTitle } = useSelector(selectAlbumsData);
  //on récupère les infos du slice player
  const { isPlaying, activeSong } = useSelector(state => state.player);

  //on redéfinit des const pour récupérer les data de chaque state
  const dataAlbum = searchAlbum['hydra:member'];
  const dataArtist = searchArtist['hydra:member'];
  const dataTitle = searchTitle['hydra:member'];

  return (
    <>
      {/* cas ou aucun résultat n'est trouvé */}
      {dataAlbum && dataAlbum?.length === 0 &&
        dataArtist && dataArtist?.length === 0 &&
        dataTitle && dataTitle?.length === 0 &&
        (<h2 className='font-bold text-3xl text-white text-left mt-10 mb-4'>
          Aucun résultat trouvé
        </h2>)}
      {/* cas ou un album est trouvé */}
      {dataAlbum && dataAlbum?.length > 0
        ? <h2 className='font-bold text-3xl text-white text-left mt-10 mb-4'>Résultat des albums</h2>
        : null
      }
      <div className='flex flex-wrap'>
        {dataAlbum && dataAlbum.map((data, index) => (
          <div key={`album_${index}`} className='p-3 m-3'>
            <AlbumCard
              data={data}
              songs={data?.songs}
              isPlaying={isPlaying}
              activeSong={activeSong}
              index={0}
            />
          </div>
        ))}
      </div>
      {/* cas ou un artiste est trouvé  */}
      {dataArtist && dataArtist?.length > 0
        ? <h2 className='font-bold text-3xl text-white text-left mt-10 mb-4'>Résultat des artistes</h2>
        : null
      }
      <div className='flex flex-wrap'>
        {dataArtist && dataArtist.map((data, index) => (
          <div key={`artist_${index}`} className='p-3 m-3'>
            <ArtistCard dataArtist={data} />
          </div>
        ))}
      </div>
      {/* cas ou un titre est trouvé */}
      {dataTitle && dataTitle?.length > 0
        ? <h2 className='font-bold text-3xl text-white text-left mt-10 mb-4'>Résultat des titres de chanson</h2>
        : null
      }
      <div className='flex flex-wrap'>
        {dataTitle && dataTitle.map((data, index) => (
          <div key={`titre_${index}`} className='p-3 m-3'>
            <AlbumCard
              data={data}
              songs={data?.songs}
              isPlaying={isPlaying}
              activeSong={activeSong}
              index={0}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default SearchView