import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchArtistDetail } from '../../redux/artist/artistSlice';
import { selectArtistData } from '../../redux/artist/artistSelector';
import HeaderDetail from '../../components/DetailArtist/HeaderDetail';
import PageLoader from '../../components/Loader/PageLoader';
import BiographyArtist from '../../components/DetailArtist/BiographyArtist';
import ListAlbumArtist from '../../components/DetailArtist/ListAlbumArtist';

const Artist = () => {

    //on utilise le hook params pour récupéré l'id 
    const params = useParams();
    const artistId = params.id;

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchArtistDetail(artistId))
      }, [])

      const {loading, artistDetail} = useSelector(selectArtistData);

      console.log('detail de ', artistDetail);
      console.log(loading);
      
  return (
    
   loading ? <PageLoader/> :
   <> 
   < HeaderDetail dataArtist={artistDetail} />
   <BiographyArtist dataArtist={artistDetail} />
   <ListAlbumArtist dataArtist={artistDetail} />
   </>
    
    
  )
}

export default Artist