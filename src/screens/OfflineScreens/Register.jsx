import React, { useState } from 'react'
import CustomInput from '../../components/CustomInput';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import ButtonLoader from '../../components/Loader/ButtonLoader';
import axios from 'axios';
import { API_ROOT } from '../../constants/apiConstant';
import { useAuthContext } from '../../contexts/AuthContext';


const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();//empeche le fonctionnement par defaut du formulaire  
    console.log('email:' + email,'password:'+ password, 'nickname:' + nickname);
    setIsLoading(true);
    axios.post(`${API_ROOT}/register`,{
      nickname, email, password
    }).then((response)=>{
      //si l'user a bien etait enregistrer en bdd l'api nous retourne un obj user 
      if(response.data.email){
        // on construit un obj user pour notre context d'authentification
        const user = {
          userId: response.data.id,
          email: response.data.email,
          nickname: response.data.nickname
        }

        //on appelle la fonction signIn pour enregistrer notre user dans le contexte 
        try {
          signIn(user)
          setIsLoading(false);
          navigate('/');
        } catch (error) {
          setIsLoading(false);
          console.log(`Erreur lors de la connexion : ${error}`);
        }
      }else {
        setIsLoading(false);
        console.log("erreur lors de la reponse du serveur");
      }
    }).catch((error)=>{
      setIsLoading(false);
      console.log(`Erreur lors de l'enregistrement de l'user : ${error}`);
    })
  
    
}

  return (
    <div className=" flex flex-1 flex-col h-screen justify-start items-center bg-black">
    <h2 className="text-white font-bold text-xl py-5">Créer un compte !</h2>
    <form className="max-w-md mx-auto">
      <CustomInput
        state={email}
        label={"votre email"}
        type={"email"}
        callable={(e) => setEmail(e.target.value)}
        />
        <CustomInput
        state={nickname}
        label={"votre surnom"}
        type={"text"}
        callable={(e) => setNickname(e.target.value)}
        />
        <CustomInput
        state={password}
        label={"votre password"}
        type={"password"}
        callable={(e) => setPassword(e.target.value)}
        />
        
        <p className="text-white">Vous avez deja un compte ? 
          <Link to = "/" className="text-white font-bold hover:text-green"> Connecter vous ! </Link>
        </p>
        <div className="flex items-center justify-center pt-5 ">
          {isLoading ? <ButtonLoader /> :
          <button type="submit" onClick={handleSubmit} className="bg-green hover:bg-green_top text-white font-bold py-2 px-4 rounded">S'enregistrer</button>
          }
        </div>
      
    </form>
  </div>
  )
}

export default Register