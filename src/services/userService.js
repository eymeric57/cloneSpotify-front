import axios from "axios";
import { API_URL } from "../constants/apiConstant";

export const checkUser = async (userInfo) => {
    try {
        //on va récupérer l'utilisateur en bdd avec l'id de l'user en session 
        const response = await axios.get(`${API_URL}/users/${userInfo.userId}`);
        const user = response.data;

        if(user.email === userInfo.email && user.nickname === userInfo.nickname){
            return true

        }else{
            return false

        }
    } catch (error) {
        console.log(`Erreur lors de la connexion : ${error}`);
        return false
        
        
    }
}