import { AiOutlineAppstoreAdd, AiOutlineHome, AiOutlineSearch } from "react-icons/ai"
import { BiLibrary } from "react-icons/bi"
import { FiSettings } from "react-icons/fi";
import { MdFavoriteBorder } from "react-icons/md";
import { IMAGE_URL } from "./apiConstant";

export const USER_INFOS = "userInfos"

//on va construite un 1er tableau pour notre sidebar 
//1 pour la gestion des albums 
export const dataAlbumNav = [
    {title:'Accueil', path:'/', icon: AiOutlineHome},
    {title:'Rechercher', path:'/search', icon: AiOutlineSearch},
    {title:'bibliothèque', path:'/library', icon: BiLibrary},
];

//2 pour les options utilisateur
export const dataUserNav = [
    {title:'Créer un playlist', path:'/add-playlist', icon: AiOutlineAppstoreAdd},
    {title:'Titres likés', path:'/wishList', icon: MdFavoriteBorder},
    {title:'Mon compte', path:'/account/:id', icon: FiSettings},]

//on récupére le chemon de notre logo 
export const imgLogo = `${IMAGE_URL}/logo.png`

//on peut définir des constantes de styles 
export const styleIcon = {width: '20px', height: '25px'}
export const tableIcon = {width: '20px', height: '25px'}

