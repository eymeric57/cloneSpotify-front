import { createContext, useContext, useState } from "react";
import { USER_INFOS } from "../constants/appConstant";

//création du context d'authentification
const AuthContext = createContext({
  userId: '', //state
  email: '', //state
  nickname: '', //state
  setUserId: () => { }, //méthode pour modifier le state userId
  setEmail: () => { }, //méthode pour modifier le state email
  setNickname: () => { }, //méthode pour modifier le state nickname
  signIn: async () => { }, //méthode pour se connecter
  signOut: async () => { }, //méthode pour se déconnecter
});

//on définit toute la mécanique de notre context
const AuthContextProvider = ({children}) => { 
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');

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
  //on définit la méthode signOut
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
    signOut,
  }
  return <AuthContext.Provider value={value} >{children}</AuthContext.Provider>
}

//création de notre propre hook pour utiliser notre context
const useAuthContext = () => useContext(AuthContext);

export {AuthContext, AuthContextProvider, useAuthContext};