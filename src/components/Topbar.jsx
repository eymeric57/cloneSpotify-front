import React, { useEffect } from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetail } from '../redux/user/userSlice';
import { selectUserData } from '../redux/user/userSelector';
import { AVATAR_URL, IMAGE_URL } from '../constants/apiConstant';
import PageLoader from './Loader/PageLoader';
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from 'react-icons/fa';

const Topbar = () => {
  const { userId } = useAuthContext();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserDetail(userId));
  }, [dispatch, userId])

  const { userDetail, loading } = useSelector(selectUserData);
  console.log(userDetail);
  
  const imgUser = userDetail?.avatar?.imagePath ? `${AVATAR_URL}/${userDetail?.avatar?.imagePath}` : `${IMAGE_URL}/user.png`;

  //méthode pour naviguer vers l'ancienne route
  const goToPreviousRoute = () => { 
    navigate(-1);
  }

  //méthode pour naviguer vers la page suivante
  const goToNextRoute = () => { 
    navigate(1);
  }

  return (
    
      <div className='h-20 flex justify-between items-center bg-green_top'>
        <div className='flex space-x-2'>
          <button
            className='text-white p-4 bg-transparent border-none outline-none'
            onClick={() => goToPreviousRoute()}
          >
            <FaRegArrowAltCircleLeft size={30} />
          </button>
          <button
            className='text-white p-4 bg-transparent border-none outline-none'
            onClick={() => goToNextRoute()}
          >
            <FaRegArrowAltCircleRight size={30} />
          </button>
        </div>
        <Link to={`/account/${userId}`} className='flex items-center space-x-2 p-4'>
          <img
            src={imgUser}
            alt="image de l'utilisateur"
            className='w-10 h-10 object-contain rounded-full mr-10 md:mr-0'
          />
          <span className="text-white hidden md:flex">{userDetail?.nickname}</span>
        </Link>
      </div>
  )
}

export default Topbar