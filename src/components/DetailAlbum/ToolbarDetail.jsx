import React, { useState } from 'react'
import PlayPause from '../PlayPause'
import { useDispatch, useSelector } from 'react-redux';
import { playPause, setActiveAlbum, setActiveSong } from '../../redux/player/playerSlice';
import { AiFillHeart, AiFillInfoCircle, AiOutlineHeart, AiOutlineInfoCircle } from 'react-icons/ai';
import { Collapse } from 'react-collapse';
import InfoCollapse from './InfoCollapse';

const ToolbarDetail = ({dataAlbum}) => {

  const data = dataAlbum
  const songs = dataAlbum?.songs;

  //on délare nos states 
  const [index, setIndex] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isInList, setIsInList] = useState(false);
  

  const dispatch = useDispatch();


  const {isPlaying, activeSong} = useSelector(state => state.player);

  const handlePauseClick = () => {
    dispatch(playPause(false))
  }

  const handlePlayClick = (index) => {
    dispatch(setActiveSong({songs, data,index}))
    dispatch(setActiveAlbum({data}))
    dispatch(playPause(true))
  }

  const toggleFavorite = () => {
    setIsInList(!isInList)
  }

  const handleCollapseClick = () => {
    setIsCollapsed(!isCollapsed)
  }





  return (
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
        data={data}        />
      </div>
      {/*bouton favoris*/}
      <div className='cursor-pointer'
      onClick={toggleFavorite}>{isInList
      ? <AiFillHeart className='text-green m-3' style={{fontSize: '30px'}}/> 
      : <AiOutlineHeart className='text-green m-3' style={{fontSize: '25px'}}/>}</div>


        {/*bouton collapse*/}
      <div className='cursor-pointer'
      onClick={handleCollapseClick}>{isCollapsed
      ? <AiFillInfoCircle className='text-green m-3' style={{fontSize: '30px'}}/> 
      : <AiOutlineInfoCircle className='text-green m-3' style={{fontSize: '25px'}}/>}</div>  

        </div>  

        {/*infos du collapse*/}
        <div>
          <Collapse isOpened={isCollapsed}>
            <InfoCollapse dataAlbum={dataAlbum}/>
          </Collapse>
        </div>

    
    
    </>
  )
}

export default ToolbarDetail