import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { USER_INFOS } from "../constants/appConstant";
import { RouterProvider } from "react-router-dom";
import OnlineRouter from "./OnlineRouter";
import OfflineRouter from "./OfflineRouter";

//création d'un mini context pour la session
const SessionContext = createContext({
  inSession: false
});
//création du hook pour utiliser le context de session
export const useSessionContext = () => useContext(SessionContext);

const AppRouter = () => {
  //on déclare notre state de session
  const [inSession, setInSession] = useState(null);
  //on récupère les infos de notre authContext
  const { userId, setUserId, setEmail, setNickname } = useAuthContext();
  //méthode qui regarde si on a des infos dans le locale storage
  const getUserInfos = async () => {
    const user = JSON.parse(localStorage.getItem(USER_INFOS));
    if (user) {
      //si j'ai un utilisateur je met a jour mon context d'authentification
      setUserId(user.userId);
      setEmail(user.email);
      setNickname(user.nickname);
      setInSession(true);
    } else {
      setInSession(false);
    }
  };

  //on va appeler la méthode getUserInfos dès que le composant est monté
  useEffect(() => {
    getUserInfos();
  }, [userId])

  const value = {
    inSession
  }

  return (
    //on récupère le context de session
    <SessionContext.Provider value={value}>
      {/* ici on appelle le bon router suivant le context de session */}
      <RouterProvider router={inSession ? OnlineRouter : OfflineRouter} />
    </SessionContext.Provider>
  )
}

export default AppRouter;