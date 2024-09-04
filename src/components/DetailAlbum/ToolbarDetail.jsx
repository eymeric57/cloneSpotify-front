import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { playPause, setActiveAlbum, setActiveSong } from '../../redux/player/playerSlice';
import PageLoader from '../Loader/PageLoader';
import PlayPause from '../PlayPause';
import { AiFillHeart, AiFillInfoCircle, AiOutlineHeart, AiOutlineInfoCircle } from 'react-icons/ai';
import { Collapse } from 'react-collapse';
import InfoCollapse from './InfoCollapse';
import { USER_INFOS } from '../../constants/appConstant';
import { fetchUserFavorite } from '../../redux/user/userSlice';
import { selectUserData } from '../../redux/user/userSelector';
import { fetchAddRemoveFavorite } from '../../services/favoriteService';
import ButtonLoader from '../Loader/ButtonLoader';

const ToolbarDetail = ({ dataAlbum }) => {
  //on déclare nos constantes
  const data = dataAlbum;
  const songs = dataAlbum?.songs;
  //on récupère l'id de l'album
  const albumId = dataAlbum?.id;
  //on récupère l'id de l'utilisateur en session
  const userId = localStorage.getItem(USER_INFOS)
    ? JSON.parse(localStorage.getItem(USER_INFOS)).userId
    : null;
  //on déclare nos states
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isInList, setIsInList] = useState(false);
  const [listArray, setListArray] = useState([]);

  //on récupère les hooks
  const dispatch = useDispatch();

  //on récupère les données des slices
  const { isPlaying, activeSong } = useSelector(state => state.player);
  const { loading, userFavorite } = useSelector(selectUserData);
  //1er useEffect pour récupérer les favoris de l'utilisateur
  useEffect(() => {
    dispatch(fetchUserFavorite(userId))

  }, [dispatch, userId])

  //2eme useEffect pour vérifier si l'album est dans la liste des favoris
  useEffect(() => {
    checkFavorite();
    setIsLoading(false);

  }, [userFavorite, userId])

  const checkFavorite = () => {
    if (userFavorite) {
      const idArray = userFavorite.map((item) => `/api/albums/${item.id}`);
      setListArray([...new Set(idArray)]) //...new Set permet de supprimer les doublons

      // if (idArray.includes(`/api/albums/${albumId}`)) setIsInList(true);
      setIsInList(idArray.includes(`/api/albums/${albumId}`));
    }
  }

  //méthode lorsqu'on met pause
  const handlePauseClick = () => {
    dispatch(playPause(false))
  }

  //méthode lorsqu'on met en lecture
  const handlePlayClick = (index) => {
    dispatch(setActiveSong({ songs, data, index }));
    dispatch(setActiveAlbum({ data }));
    dispatch(playPause(true));
  }

  //méthode pour gérer le favorie
  const toggleFavorite = async () => {
    setIsLoading(true);
    //on va créer une copie de listArray
    let updatedListArray = [...listArray];

    if (isInList) {
      //supprimer l'id de l'album dans le tableau
      updatedListArray = listArray.filter((item) => item !== `/api/albums/${albumId}`);
    } else {
      //on ajoute l'id de l'album dans le tableau
      updatedListArray.push(`/api/albums/${albumId}`);
    }

    // const updatedListArray = isInList
    //   ? listArray.filter((item) => item !== `/api/albums/${albumId}`)
    //   : [...listArray, `/api/albums/${albumId}`];

    //on appelle le service pour mettre a jour la liste de favorie dans la bdd
    await fetchAddRemoveFavorite(updatedListArray, userId);

    //on met à jour le state
    setListArray(updatedListArray);

    setIsInList(!isInList);

    setIsLoading(false);
  }

  //méthode pour ouvrir ou fermer le collapse
  const handleCollapseClick = () => {
    setIsCollapsed(!isCollapsed);
  }


  return (
    loading ? <PageLoader /> :
      <>
        <div className='flex items-center ml-5'>
          <div className='cursor-pointer mr-3'>
            <PlayPause
              songs={songs}
              handlePause={handlePauseClick}
              handlePlay={() => handlePlayClick(index)}
              isPlaying={isPlaying}
              activeSong={activeSong}
              index={index}
              data={data}
            />
          </div>
          {/* bouton favorie */}
          {isLoading ? <div className='m-3'>
            <ButtonLoader size={30} />
          </div> :
            <div className='cursor-pointer' onClick={() => toggleFavorite()}>
              {isInList ?
                <AiFillHeart className='text-green m-3' style={{ fontSize: '30px' }} />
                :
                <AiOutlineHeart className='text-green m-3' style={{ fontSize: '30px' }} />}
            </div>}
          {/* bouton collapse */}
          <div className='cursor-pointer' onClick={handleCollapseClick}>
            {isCollapsed ?
              <AiFillInfoCircle className='text-green m-3' style={{ fontSize: '30px' }} />
              :
              <AiOutlineInfoCircle className='text-green m-3' style={{ fontSize: '30px' }} />}
          </div>
        </div>
        {/* on récupère les infos du collapse */}
        <div>
          <Collapse isOpened={isCollapsed}>
            {/* affichage du rendu du collapse */}
            <InfoCollapse dataAlbum={dataAlbum} />
          </Collapse>
        </div>
      </>
  )
}

export default ToolbarDetail