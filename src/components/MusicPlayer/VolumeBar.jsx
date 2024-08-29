import React from 'react'
import { BiVolumeFull, BiVolumeLow, BiVolumeMute } from 'react-icons/bi'

const VolumeBar = ({value, min, max, onChange, setVolume}) => {
  return (
    <div className='hidden sm:flex flex-1 items-center justify-end'>
        {value <= 1 && value > 0.5 &&
        <BiVolumeFull 
        className='cursor-pointer'
        size={25}
        color={"#FFF"}
        onClick={() => setVolume(0)}
        />}
        {value <= 0.5 && value > 0 &&
        <BiVolumeLow 
        className='cursor-pointer'
        size={25}
        color={"#FFF"}
        onClick={() => setVolume(0.5)}
        />}
        {value == 0 &&
        <BiVolumeMute
        className='cursor-pointer'
        size={25}
        color={"#FFF"}
        onClick={() => setVolume(0.5)}
        />}
       <input
       type='range'
       min={min} max={max} value={value} onChange={onChange}
       step="any"
       className='2xl:w-40 lg:w-32 md:w-32 h-1 ml-4'/>
       <p className='text-white ml-1'>{Math.floor(value * 100)}%</p>
    </div>
  )
}

export default VolumeBar