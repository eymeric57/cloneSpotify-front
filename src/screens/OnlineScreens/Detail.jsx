import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { fetchAlbumDetail } from '../../redux/albums/albumSlice';
import { selectAlbumsData } from '../../redux/albums/albumSelector';
import PageLoader from '../../components/Loader/PageLoader';
import DetailAlbum from '../../components/DetailAlbum';

const Detail = () => {
  //on va appeler le hook useParams pour récupérer l'id de l'album
  const params = useParams();
  const id = params.id;
  //on récupère le hook useDispatch pour pouvoir appeler nos fonction dans redux
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAlbumDetail(id))
  }, [])

  //on récupère les données de l'album depuis le selector
  const { loading, albumDetail } = useSelector(selectAlbumsData);

  return (
    loading ? <PageLoader /> :
      <DetailAlbum dataAlbum={albumDetail} />
  )
}

export default Detail