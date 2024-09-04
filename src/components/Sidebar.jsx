import React, { useState } from 'react'
import { useAuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { dataAlbumNav, dataUserNav, imgLogo, styleIcon } from '../constants/appConstant';
import NavLinks from './NavLinks';
import { FiLogOut } from 'react-icons/fi';
import { RiCloseLine } from 'react-icons/ri';
import { HiOutlineMenu } from 'react-icons/hi';

const Sidebar = () => {
  //on crée un state pour gérer l'affichage du menu mobile
  const [mobileMenu, setMobileMenu] = useState(false);
  //depuis notre context d'authentification on récupère les infos de l'utilisateur
  const { userId, signOut } = useAuthContext();
  //on récupère le hook de navigation
  const navigate = useNavigate();

  //on crée une méthode pour déconnecter l'utilisateur
  const handleLogout = () => {
    signOut();
    navigate('/');
  }

  return (
    <>
      {/* navbar pour la vue au dessus de 768px */}
      <div className='hidden md:flex flex-col w-[240px] py-10 px-4 bg-black justify-between'>
        <div>
          <img
            src={imgLogo}
            alt="Logo Spotify"
            className='w-full h-14 object-contain'
          />
          <NavLinks marginTop={'mt-10'} array={dataAlbumNav} />
          <NavLinks marginTop={'mt-5'} array={dataUserNav} userId={userId} />
        </div>
        {/* ajout d'un bouton de deconnexion */}
        <div className='mt-5'>
          <button
            onClick={() => {
              const confirmLogout = window.confirm('Voulez-vous vraiment vous déconnecter?');
              if (confirmLogout) handleLogout();
            }}
            className='w-full flex p-3 items-center justify-start font-medium text-sm text-white hover:bg-green_06'
          >
            <FiLogOut style={styleIcon} className='mr-2' />
            Déconnexion
          </button>
        </div>
      </div>
      {/* gestion des icones pour ouvrir/fermer le menu en petit ecran */}
      <div className='absolute md:hidden block top-6 right-3'>
        {mobileMenu ? (
          <RiCloseLine
            style={styleIcon}
            className='text-white mr-2'
            onClick={() => setMobileMenu(false)}
          />
        ) : (
          <HiOutlineMenu
            style={styleIcon}
            className='text-white mr-2'
            onClick={() => setMobileMenu(true)} />
        )

        }
      </div>
      {/* navbar pour la vue en dessous de 768px */}
      <div className={`z-20 absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white_01 to-black backdrop-blur-lg p-6 md:hidden smooth-transition ${mobileMenu ? 'left-0' : '-left-full'} flex flex-col justify-between`}>
        <div>
          <img
            src={imgLogo}
            alt="Logo Spotify"
            className='w-full h-14 object-contain'
          />
          <NavLinks marginTop={'mt-10'} array={dataAlbumNav} handleClick={() => setMobileMenu(false)} />
          <NavLinks marginTop={'mt-5'} array={dataUserNav} handleClick={() => setMobileMenu(false)} userId={userId} />
        </div>
        {/* ajout d'un bouton de deconnexion */}
        <div className='mt-5'>
          <button
            onClick={() => {
              const confirmLogout = window.confirm('Voulez-vous vraiment vous déconnecter?');
              if (confirmLogout) handleLogout();
            }}
            className='w-full flex p-3 items-center justify-start font-medium text-sm text-white hover:bg-green_06'
          >
            <FiLogOut style={styleIcon} className='mr-2' />
            Déconnexion
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar