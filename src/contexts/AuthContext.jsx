import { createContext, useContext, useState } from "react";
import { USER_INFOS } from "../constants/appConstant";


//création du context d'authentification
const AuthContext = createContext({
  userId: "", //state
  email: "", //state
  nickname: "", //state
  setUserId: () => {}, //methode pour modifier le state
  setEmail: () => {}, //fonction
  setNickname: () => {}, //fonction
  signIn: async () => {}, //fonction
  signOut: async () => {},
});

//on définit toute la mécanique de notre context 
const AuthContextProvider = ({ children }) => {
    const [userId, setUserId] = useState("");
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");

    //on définit la méthode signIn 
    const signIn = async (user) => {
        try {
          setUserId(user.userId);
          setEmail(user.email);
          setNickname(user.nickname);
          localStorage.setItem(USER_INFOS, JSON.stringify(user));  
        } catch (error) {
            throw new Error(`Erreur lors de la connexion : ${error}`);
            
        }
    }

    const signOut = async () => {
        try {
          setUserId('');
          setEmail('');
          setNickname('');
          localStorage.removeItem(USER_INFOS);  
        } catch (error) {
            throw new Error(`Erreur lors de la déconnexion : ${error}`);
            
        }
    }

    const value = {
        userId,
        email,
        nickname,
        setUserId,
        setEmail,
        setNickname,
        signIn,
        signOut
    }

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

    )
        
    //création de notre propre hook pour utiliser notre context 


    
}

    const useAuthContext =()=> useContext(AuthContext);
    

export { AuthContextProvider, useAuthContext, AuthContext }