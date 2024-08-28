import React from 'react'
import { Circles } from 'react-loader-spinner'

const PageLoader = () => {
  return (
    <div className='flex flex-col items-center justify-center h-[70vh]'> <Circles
    height="100"
    width="100"
    color="rgba(30,215,96,1)"
    ariaLabel="circles-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
    />

    </div>
  )
}

export default PageLoader