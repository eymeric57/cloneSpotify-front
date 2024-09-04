import React from 'react'
import { NavLink } from 'react-router-dom'
import { styleIcon } from '../constants/appConstant'

const NavLinks = ({ marginTop, array, handleClick, userId = 0 }) => {
  return (
    <div className={marginTop}>
      {/* ici on va mapper sur notre 1er tableau  */}
      {array.map((item) => (
        <NavLink
          key={item.title}
          to={item.path.replace(':id', userId)}
          end
          className='flex flex-row items-center justify-start font-medium text-sm text-white hover:bg-green_06 p-3'
          onClick={() => handleClick && handleClick()}
        >
          <item.icon style={styleIcon} className='mr-2' />
          {item.title}

        </NavLink>
      ))

      }
    </div>
  )
}

export default NavLinks