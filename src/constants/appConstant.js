import { AiOutlineAppstoreAdd, AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { BiLibrary } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { MdFavoriteBorder } from "react-icons/md";
import { IMAGE_URL } from "./apiConstant";

//constante pour la clé du local storage
export const USER_INFOS = "userInfos";

//on va construire 2 tableaux pour notre sidebar
// 1: pour la gestion des albums
export const dataAlbumNav = [
  {title: 'Accueil', path: '/', icon: AiOutlineHome},
  {title: 'Rechercher', path: '/search', icon: AiOutlineSearch},
  {title: 'Bibliothèque', path: '/library', icon: BiLibrary},
];

//2 : Pour les options utilisateur
export const dataUserNav = [
  { title: 'Créer une playlist', path: '/add-playlist', icon: AiOutlineAppstoreAdd },
  { title: 'Titres likés', path: '/wishlist', icon: MdFavoriteBorder },
  { title: 'Mon compte', path: '/account/:id', icon: FiSettings }, //TODO : prévoir la route
];

//on récupère le chemin de notre logo
export const imgLogo = `${IMAGE_URL}/logo.png`;

//on peut définir des constantes de styles
export const styleIcon = {width: '25px', height: '25px'};
export const tableIcon = {width: '20px', height: '20px'};
