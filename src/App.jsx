import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { USER_INFOS } from './constants/appConstant';
import { useAuthContext } from './contexts/AuthContext';
import { checkUser } from './services/userService';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { useSelector } from 'react-redux';
import MusicPlayer from './components/MusicPlayer';

const App = () => {
  //on récupère les infos du local storage
  const userInfo = JSON.parse(localStorage.getItem(USER_INFOS));
  //on récupère la méthode signOut de notre context d'authentification
  const { signOut } = useAuthContext();
  //on récupère le hook de navigation
  const navigate = useNavigate();

  //récupère activeSong depuis le slice
  const { activeSong } = useSelector(state => state.player);

  //méthode qui check l'user si c'est le bon sinon on déconnecte
  const fetchUser = async () => {
    const user = await checkUser(userInfo);
    if (user) {
      return;
    } else {
      signOut();
      navigate('/');
    }
  }

  useEffect(() => {
    fetchUser();
  }, [userInfo])

  return (
    <div className='relative flex'>
      <Sidebar />
      <div className='flex flex-1 flex-col bg-gradient-to-b from-black to-[rgb(18,18,18)]'>
        <Topbar />
        <div className='h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse'>
          <div className='flex-1 h-fit pb-40 text-white'>
            <Outlet />
          </div>
        </div>
      </div>
      {/*ici le player */}
      {activeSong?.title && (
        <div className='absolute h-28 bottom-0 left-0 right-0 animate-slideup bg-gradient-to-br from-white_01 to-black backdrop-blur-lg rounded-t-3xl z-10'>
          <MusicPlayer />
        </div>
      )}

    </div>
  )
}

export default App