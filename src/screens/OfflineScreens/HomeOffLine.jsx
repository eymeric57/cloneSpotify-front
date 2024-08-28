import React from 'react'
import { Outlet } from 'react-router-dom'
import { IMAGE_URL } from '../../constants/apiConstant'


const HomeOffLine = () => {
  return (
    <>
    <div className='w-screen bg-black'>
      <img src={`${IMAGE_URL}/logo.png`} alt="'Logo spotify" className='w-full h-28 object-contain pt-4' />
    </div>
    
    <Outlet />
    </>
    
  )
}

export default HomeOffLine