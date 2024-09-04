import React, { useState } from 'react'
import Popup from 'reactjs-popup'
import { useAuthContext } from '../contexts/AuthContext'
import axios from 'axios'
import { API_URL } from '../constants/apiConstant'
import ButtonLoader from './Loader/ButtonLoader'

const PopupPlaylist = ({ isOpen, setIsOpen }) => {
  //on crée un state pour récupérer le titre de la playlist
  const [title, setTitle] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  //on récupère l'id de l'utilisateur connecté
  const { userId } = useAuthContext();

  //méthode pour enregistrer la playlist
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      //on va vérifier que title n'est vide
      if (title === '') {
        setError('Le titre de la playlist ne peut pas être vide');
        setIsLoading(false);
        return;
      } else {
        setError('');
        const data = {
          title: title,
          user: `/api/users/${userId}`
        }
        const response = await axios.post(`${API_URL}/playlists`, data)
        if (response.status === 201) {
          setIsLoading(false);
          setIsOpen(false);
          setTitle('');
        } else {
          setIsLoading(false);
          setError('Erreur lors de la création de la playlist');
        }
      }
    } catch (error) {
      console.log(`Erreur lors de la création de la playlist : ${error}`);
      setIsLoading(false);

    }

  }


  return (
    <Popup
      open={isOpen}
      onClose={() => setIsOpen(false)}
      modal
      nested
    >
      {close => (
        <div className='modal bg-black border outline-none border-1 border-green_top rounded-lg p-6 flex flex-col items-center justify-center relative min-w-[250px] md:min-w-[500px]'>
          <button
            className='close text-red-500 font-bold text-xl absolute top-3 right-3 p-1'
            onClick={() => {
              close()
              setIsOpen(false)
            }}
          >
            &times;
          </button>
          <h2 className='header text-white text-xl md:text-2xl mb-4'>Nom de la playlist</h2>
          <form onSubmit={handleSubmit} className='content w-full flex flex-col items-center'>
            <input
              type="text"
              className='input mb-4 p-2 border border-green_top rounded-md w-full md:w-3/4'
              placeholder='Nom de la playlist'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {error && <p className='text-red-500 mb-3'>{error}</p>}
            {isLoading ? <ButtonLoader /> :
              <button type="submit" className='bg-green_top hover:bg-green text-white px-4 py-2 rounded-md'>
                Créer la playlist
              </button>}
          </form>
        </div>
      )

      }
    </Popup>
  )
}

export default PopupPlaylist