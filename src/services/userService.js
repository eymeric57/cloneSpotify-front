import axios from "axios"
import { API_URL } from "../constants/apiConstant"

export const checkUser = async (userInfo) => { 
  try {
    //on va récupérer l'utilisateur en bdd avec l'id de l'utilisateur en session
    const response = await axios.get(`${API_URL}/users/${userInfo.userId}`)
    const user = response.data;
    //maintenant on va comparer les données de la bdd avec les données du local storage
    if(user.email === userInfo.email && user.nickname === userInfo.nickname){
      return true;
    }else{
      return false;
    }
  } catch (error) {
    console.log(`Erreur sur le checkUser: ${error}`)
    return false;
  }
}