import React from 'react'
import { MdDangerous } from 'react-icons/md'
import { Link, useRouteError } from 'react-router-dom'

const ErrorPage = () => {

  const error = useRouteError()

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-black text-white'>
      <MdDangerous className='text-9xl text-red-600' />
      <h1>Oops! </h1>
      <p>Désolé, mais une erreur c'est produite , sans doute la faute de philip ! 
 <i> {error.statusText || error.message} </i>

      </p>
      <Link to='/' className='text-blue-600'>Retourner en lieu sûr</Link>    
    </div>
  )
}

export default ErrorPage