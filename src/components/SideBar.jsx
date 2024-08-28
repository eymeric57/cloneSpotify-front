import React, { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import {
  dataAlbumNav,
  dataUserNav,
  imgLogo,
  styleIcon,
} from "../constants/appConstant";
import NavLinks from "./NavLinks";
import { FiLogOut } from "react-icons/fi";
import { RiCloseLine } from "react-icons/ri";
import { HiOutlineMenu } from "react-icons/hi";

const SideBar = () => {
  //on crée un state pour le menu mobile
  const [mobileMenu, setMobileMenu] = useState(false);
  //depuis notre context on va récupérer les infos utilisateur
  const { userId, signOut } = useAuthContext();
  //on récupére le hook de navigation
  const navigate = useNavigate();

  //on crée une methode pour deco l'user
  const handleLogout = () => {
    signOut();
    navigate("/");
  };

  return (
    <>
      {/*navbar vue au dessu de 768px */}
      <div className="hidden md:flex flex-col w-[240px] py-10 px-4 bg-black justify-between">
        <div>
          <img
            src={imgLogo}
            alt="Logo spotify"
            className="w-full h-14 object-contain"
          />
          <NavLinks marginTop={"mt-10"} array={dataAlbumNav} />

          <NavLinks marginTop={"mt-5"} array={dataUserNav} />
        </div>
        {/*ajout bouton de déconnexion */}
        <div className="mt-5">
          <button
            onClick={() => {
              const confirmLogout = window.confirm(
                "Voulez-vous vous deconnecter ?"
              );
              if (confirmLogout) {
                handleLogout();
              }
            }}
            className="flex flex-row items-center justify-start font-medium text-sm text-white hover:bg-green06 p-3"
          >
            <FiLogOut style={styleIcon} className="mr-2"></FiLogOut>
            déconnexion
          </button>
        </div>
      </div>

      {/*navbar vue en dessous de 768px */}
      <div className="absolute md:hidden block top-6 right-3 cursor-pointer">
        {mobileMenu ? (
          <RiCloseLine
            style={styleIcon}
            className="text-white mr-2"
            onClick={() => setMobileMenu(false)}
          />
        ) : (
          <HiOutlineMenu
            style={styleIcon}
            className="text-white mr-2 cursor-pointer"
            onClick={() => setMobileMenu(true)}
          />
        )}
      </div>
      <div
        className={`z-20 absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white01 to-black backdrop-blur-lg p-6 md:hidden smooth-transition
          ${
            mobileMenu ? "left-0" : "-left-full"
          } flex flex-col justify-between`}
      >
        <div>
          <img
            src={imgLogo}
            alt="Logo spotify"
            className="w-full h-14 object-contain"
          />
          <NavLinks marginTop={"mt-10"} array={dataAlbumNav} handleClick={() => setMobileMenu(false)} />

          <NavLinks marginTop={"mt-5"} array={dataUserNav}  handleClick={() => setMobileMenu(false)} />
        </div>
        <div className="mt-5">
          <button
            onClick={() => {
              const confirmLogout = window.confirm(
                "Voulez-vous vous deconnecter ?"
              );
              if (confirmLogout) {
                handleLogout();
              }
            }}
            className="flex flex-row items-center justify-start font-medium text-sm text-white hover:bg-green06 p-3"
          >
            <FiLogOut style={styleIcon} className="mr-2"></FiLogOut>
            déconnexion
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBar;
