import React from 'react'
import { Audio } from 'react-loader-spinner'

const ButtonLoader = ({size = 60}) => {
  return (
    <Audio
      height={size}
      width={size}
      color="rgba(30, 215, 96,1)"
      ariaLabel="audio-loading"
      wrapperStyle={{}}
      wrapperClass="wrapper-class"
      visible={true}
    />
  )
}

export default ButtonLoader