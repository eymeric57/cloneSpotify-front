import React, { useEffect } from 'react'
import albumSlice, { fetchAlbums } from '../../redux/albums/albumSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectAlbumsData } from '../../redux/albums/albumSelector';
import PageLoader from '../../components/Loader/PageLoader';
import AlbumCard from '../../components/AlbumCard';


const Home = () => {

    //on récupére le hook de react-redux qui permet de récupérer les actions  
    const dispatch = useDispatch();

    //on veut des le montage du composant, récupérer les albums 
    useEffect(() => {
    dispatch(fetchAlbums());
    }, [dispatch])

    //on doit récupérer les données depuis le selector 
    const {loading, albums} = useSelector(selectAlbumsData)
    const {activeSong, isPlaying} = useSelector(state =>state.player)

    const dataAlbum = albums['hydra:member'];

    
    

  return (
    loading ? <PageLoader/> : 
    <div className='flex flex-col'>
      <h2 className='font-bold text-3xl text-white text-left mt-4 mb-10'>Liste des albums</h2>
      <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
        {/*on va mapper sur data album */}
        {dataAlbum && dataAlbum.map((data, index) => {
         
          
          return (
            <AlbumCard
             key={index} 
             data={data}
             songs={data.songs}
             isPlaying={isPlaying}
             activeSong={activeSong}
             index={0}/>
          )
        })}


      </div>
    </div>
  )
}

export default Home