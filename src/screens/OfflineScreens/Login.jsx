import React, { useState } from 'react'
import { useAuthContext } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import CustomInput from '../../components/CustomInput';
import ButtonLoader from '../../components/Loader/ButtonLoader';
import axios from 'axios';
import { API_ROOT } from '../../constants/apiConstant';

const Login = () => {
  //on va déclarer nos states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  //on va récupérer la méthode signIn de notre context d'authentification
  const { signIn } = useAuthContext();
  //on récupère le hook de navigation
  const navigate = useNavigate();

  //méthode qui receptionne les données du formulaire
  const handleSubmit = (event) => {
    event.preventDefault(); //empeche le fonctionnement par défaut du formulaire
    setIsLoading(true); //on met le loader en marche
    axios.post(`${API_ROOT}/login`, {
      email, password
    }).then((response) => {
      //si l'utilisateur a bien été enregistré en bdd l'api nous retourne un objet user (dans response.data)
      if (response.data.email) {
        //on reconstruit un objet user pour notre context d'authentification
        const user = {
          userId: response.data.id,
          email: response.data.email,
          nickname: response.data.nickname,
        }
        //on appelle la méthode signIn pour enrtegistrer notre utilisateur dans le context
        try {
          signIn(user);
          setIsLoading(false);
          navigate('/'); //on redirige l'utilisateur vers la page d'accueil du router Online
        } catch (error) {
          setIsLoading(false);
          console.log(`Erreur lors de la création de la session: ${error}`);
        }
      } else {
        setIsLoading(false);
        console.log(`Erreur lors de la réponse du serveur: ${response}`);
      }
    }).catch((error) => {
      setIsLoading(false);
      console.log(`Erreur lors de la connexion de l'user': ${error}`);
    })

  }



  return (
    <div className='flex flex-1 flex-col h-screen justify-start items-center bg-black'>
      <h2 className='text-white font-bold text-xl py-5'>Connectez vous!</h2>
      <form className='max-w-md mx-auto' onSubmit={handleSubmit}>
        <CustomInput
          state={email}
          label={"Votre email"}
          type={"email"}
          callable={(e) => setEmail(e.target.value)}
        />
        <CustomInput
          state={password}
          label={"Votre mot de passe"}
          type={"password"}
          callable={(e) => setPassword(e.target.value)}
        />
        <p className='text-white'>Vous n'avez pas de compte?
          <Link to="/register" className='text-white font-bold hover:text-green'> Créer un compte</Link>
        </p>
        <div className='flex items-center justify-center pt-5'>
          {isLoading ? <ButtonLoader /> :
            <button type='submit' className='bg-green hover:bg-green_top text-white font-bold py-2 px-4 rounded'>
              Se connecter
            </button>}
        </div>
      </form>
    </div>
  )
}

export default Login