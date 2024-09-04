import axios from "axios";
import { API_URL } from "../constants/apiConstant";

export const fetchAddRemoveFavorite = async (arrayIds, userId) => {
  const dataFavorite = {
    albums: arrayIds
  }
  try {
    //on ajoute la méthode patch a axios
    axios.defaults.headers.patch['Content-Type'] = 'application/merge-patch+json';
    const response = await axios.patch(`${API_URL}/users/${userId}`, dataFavorite);
  } catch (error) {
    console.log(`Erreur lors de la mise à jour des favoris: ${error}`);
  }
}