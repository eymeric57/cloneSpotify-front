import React, { useState } from 'react'
import CustomInput from '../../../components/CustomInput'
import { Link, useNavigate } from 'react-router-dom';
import ButtonLoader from '../../../components/Loader/ButtonLoader';
import { useAuthContext } from '../../../contexts/AuthContext';
import { USER_INFOS } from '../../../constants/appConstant';
import { checkUser } from '../../../services/userService';
import axios from 'axios';
import { API_ROOT, API_URL } from '../../../constants/apiConstant';

const EditInfo = () => {
  //on récupère les infos de l'utilisateur depuis le authContext
  const { userId, nickname, email, signIn, signOut } = useAuthContext();

  const navigate = useNavigate();

  const [nicknameValue, setNicknameValue] = useState(nickname);
  const [emailValue, setEmailValue] = useState(email);
  const [passwordValue, setPasswordValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //on passe isLoading à true
      setIsLoading(true);
      //on va vérifier que l'utilisateur en session est le bon
      const userInfo = JSON.parse(localStorage.getItem(USER_INFOS));
      const userValid = await checkUser(userInfo);
      if (userValid) {
        //on vérifie que tous les champs sont remplis
        if (emailValue.length > 0 && nicknameValue.length > 0 && passwordValue.length > 0) {
          //on reconstruit des petits tableaux
          // on crée un tableau pour vérifier le mdp (checkPassword)
          const dataCheck = {
            id: userId,
            password: passwordValue
          }

          // on crée un tableau pour le patch (pour modifier les infos de l'user) on ne prend pas le mdp
          const data = {
            email: emailValue,
            nickname: nicknameValue
          }

          //on crée un tableau pour les entetes de la requete (headers)
          const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
          }

          try {
            // requete qui verifie que le mot de passe est correct
            const respPassword = await axios.post(`${API_ROOT}/check-password`, dataCheck, { headers });
            if (respPassword.data.response) {
              try {
                //requete qui verifie si l'eamail est deja utilisé
                const respEmail = await axios.get(`${API_URL}/users?page=1&email=${emailValue}`);
                if (emailValue != email && respEmail.data['hydra:member'].length > 0) {
                  setError('Cet email est déjà utilisé');
                  setIsLoading(false);
                  return;
                } else {
                  //requete qui modifie les infos de l'utilisateur
                  try {
                    // config pour la méthode patch d'axios
                    axios.defaults.headers.patch['Content-Type'] = 'application/merge-patch+json';
                    const resp = await axios.patch(`${API_URL}/users/${userId}`, data);
                    //on reconstruit un objet user
                    const user = {
                      userId: resp.data.id,
                      nickname: resp.data.nickname,
                      email: resp.data.email
                    }
                    //mise a jour du context d'authentification
                    signIn(user);
                    setIsLoading(false);
                    //on redirige sur la page account
                    navigate(`/account/${userId}`);

                  } catch (error) {
                    console.log(`erreur lors de la modification des infos : ${error}`);
                    setIsLoading(false);
                  }
                }
              } catch (error) {
                console.log(`erreur lors de la vérification de l'email : ${error}`);
                setIsLoading(false);
              }
            } else {
              setError('Mot de passe incorrect');
              setIsLoading(false);
              return;
            }
          } catch (error) {
            console.log(`erreur lors de la vérification du mot de passe : ${error}`);
            setIsLoading(false);
          }
        } else {
          setError('Veuillez remplir tous les champs');
          setIsLoading(false);
          return;

        }
      } else {
        signOut();
        setIsLoading(false);
        navigate('/');
      }
    } catch (error) {
      console.log(`erreur lors de la vérification de l'utilisateur : ${error}`);
      setIsLoading(false);
    }
  }


  return (
    <div className='flex flex-1 flex-col h-screen justify-start items-center bg-black'>
      <h2 className='text-white font-bold text-xl py-5'>Modifier mes infos</h2>
      <div className='text-red-600 font-bold mb-4'>{error}</div>
      <form className='w-[350px] mx-auto' onSubmit={handleSubmit}>
        <CustomInput
          state={nicknameValue}
          label={"Votre pseudo"}
          type={"text"}
          callable={(e) => setNicknameValue(e.target.value)}
        />
        <CustomInput
          state={emailValue}
          label={"Votre email"}
          type={"email"}
          callable={(e) => setEmailValue(e.target.value)}
        />
        <CustomInput
          state={passwordValue}
          label={"Valider avec votre mot de passe"}
          type={"password"}
          callable={(e) => setPasswordValue(e.target.value)}
        />

        <div className='flex items-center justify-center pt-5'>
          {isLoading ? <ButtonLoader /> :
            <button type='submit' className='bg-green hover:bg-green_top text-white font-bold py-2 px-4 rounded'>
              Modifier mes infos
            </button>}
        </div>
      </form>
    </div>

  )
}

export default EditInfo