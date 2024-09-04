import React from 'react'
import { useSelector } from 'react-redux';
import AlbumCard from '../AlbumCard';

const ListAlbumArtist = ({dataArtist}) => {

  //on récupère les infos du slice player
  const { activeSong, isPlaying} = useSelector(state => state.player);
  const albums = dataArtist?.albums ?? [];
  
  return (
   <>
    <div className='flex flex-wrap'>
      {albums && albums.map((data, index)=>{
        return (
          <div key={index} className='m-3'>
            <AlbumCard 
              data={data}
              songs={data?.songs}
              isPlaying={isPlaying}
              activeSong={activeSong}
              index={0}
              artist={dataArtist?.name}
            />
          </div>
        )
      })}
    </div>
   </>
  )
}

export default ListAlbumArtist