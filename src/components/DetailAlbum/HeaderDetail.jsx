import React from 'react'
import { ALBUM_URL } from '../../constants/apiConstant'
import HeaderInfo from './HeaderInfo'
import HeaderCategory from './HeaderCategory'

const HeaderDetail = ({dataAlbum}) => {

    //on déclare une constante pour l'image de l'album 
    const imgPath = `${ALBUM_URL}/${dataAlbum?.imagePath}`


  return (
    <div className='bg-gradient-to-b from-green_top to-transparent p-5 w-full flex items-center'>
        <img src={imgPath} 
            alt={`Image de l'album ${dataAlbum?.title}`} 
        className='w-48 h-48 rounded-full object-cover border-solid border-4 border-white '/>
        <div className='ml-10 flex flex-col justify-end'>
        <h1 className='text-white font-bold text-5xl my-7'>{dataAlbum?.title}</h1>
        <HeaderInfo dataAlbum={dataAlbum}/>
        <HeaderCategory dataAlbum={dataAlbum}/>
        </div>



    </div>
  )
}

export default HeaderDetail