import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { USER_INFOS } from "../constants/appConstant";
import { RouterProvider } from "react-router-dom";
import OnlineRouter from "./OnlineRouter";
import OfflineRouter from "./OfflineRouter";



//création d'un mini context pour la session 
const SessionContext = createContext({
    inSession: false,


});

//création du hook pour utiliser le context de session 
export const useSessionContext = () => useContext(SessionContext)

const AppRouter = () => {

    //on déclare nos state de session
    const [inSession, setInSession] = useState(null);
    //on récupére les infos de notre authcontext
    const {userId, setUserId, setEmail, setNickname} = useAuthContext();
    //methode qui verifie si ont a des infos dans le localstorage
    const getUserInfos = async () => {
        const user = JSON.parse(localStorage.getItem(USER_INFOS));

        if (user) {
            //  si jai des infos dans le localstorage on les mets dans le contexte
            setUserId(user.userId);
            setEmail(user.email);
            setNickname(user.nickname);
            setInSession(true);
        }else {
            setInSession(false);
        }
    }

    //on va appeler getUserInfos des que le coposant est monté 
    useEffect(() => {
        getUserInfos();
    }, [userId])

    const value = {inSession}
    return (
        <SessionContext.Provider value={value}>
            <RouterProvider router={inSession ? OnlineRouter : OfflineRouter} /> 
        </SessionContext.Provider>
    )
}

export default AppRouter