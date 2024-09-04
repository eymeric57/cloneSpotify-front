import React from 'react'
import parse from 'html-react-parser'

const BiographyArtist = ({ dataArtist }) => {

  const bio = dataArtist?.biography
    ? parse(dataArtist?.biography)
    : 'Pas de biographie disponible'

  return (
    <div className='flex justify-center md:justify-start md:ml-4 my-5'>
      <div className='w-[80%] flex flex-col md:w-[60%]'>
        <h2 className='text-2xl mb-4'>Biographie :</h2>
        <div className="text-justify">{bio}</div>
      </div>
    </div>
  )
}

export default BiographyArtist