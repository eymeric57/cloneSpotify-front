import React from 'react'
import { NavLink } from 'react-router-dom'
import { styleIcon } from '../constants/appConstant'


const NavLinks = ({marginTop, array, handleClick}) => {



  return (

    <div className={marginTop}>
            {/* ici on va mapper sur notre premier tableau */}
            {array.map((item) => (
              <NavLink
              onClick={()=> handleClick && handleClick()}
              key={item.title}
                to={item.path}
                end
                className="flex flex-row items-center justify-start font-medium text-sm text-white hover:bg-green06 p-3"
              >
                <item.icon style={styleIcon} className="mr-2"></item.icon>
                {item.title}
              </NavLink>
            ))}
          </div>
  )
}

export default NavLinks