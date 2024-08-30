import React from 'react'
import { useSelector } from 'react-redux';
import AlbumCard from '../AlbumCard';

const ListAlbumArtist = ({dataArtist}) => {

    console.log(dataArtist);

    //on recupére des info du slice player 
    const {activeSong, isPlaying} = useSelector((state) => state.player)
    const albums = dataArtist?.albums ?? [];
    
  return (
    <>
    <div className='flex flex-wrap'>
        {albums && albums.map((data, index) => {
            return (
                <div key={index}
                className='m-3'>
                    <AlbumCard
                    data={data}
                     index={0} 
                     songs={data?.songs}
                      isPlaying={isPlaying} 
                      activeSong={activeSong}
                      artist={dataArtist?.name} />

                </div>
            )
        })}


    </div>
    </>
  )
}

export default ListAlbumArtist