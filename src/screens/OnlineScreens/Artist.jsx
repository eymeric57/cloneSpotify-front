import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { fetchArtistDetail } from '../../redux/artist/artistSlice';
import { selectArtistData } from '../../redux/artist/artistSelector';
import PageLoader from '../../components/Loader/PageLoader';
import HeaderDetail from '../../components/DetailArtist/HeaderDetail';
import BiographyArtist from '../../components/DetailArtist/BiographyArtist';
import ListAlbumArtist from '../../components/DetailArtist/ListAlbumArtist';

const Artist = () => {
  //on va appeler le hook useParams pour récupérer l'id de l'artiste
  const params = useParams();
  const artistId = params.id;
  //on va appeler le hook useDispatch pour pouvoir executer nos fonction des slices
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArtistDetail(artistId))
  }, [])

  const { loading, artistDetail } = useSelector(selectArtistData);

  return (

    loading ? <PageLoader /> :
      <>
        <HeaderDetail dataArtist={artistDetail} />
        <BiographyArtist dataArtist={artistDetail} />
        <ListAlbumArtist dataArtist={artistDetail} />
      </>
  )
}

export default Artist