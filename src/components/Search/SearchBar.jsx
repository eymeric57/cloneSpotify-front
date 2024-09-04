import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchSearch } from '../../redux/albums/albumSlice';

const SearchBar = () => {

  //on crée un state pour capter la valeur de l'input
  const [searchWord, setSearchWord] = useState('')
  const [error, setError] = useState('')
  //on récupère le hook dispatch
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault()
    //si searchword contient moins de 3 caractère on set une error et on return
    if (searchWord.length < 3) {
      setError('Votre recherche doit contenir au moins 3 caractères')
      return
    }else{
      setError('')
      dispatch(fetchSearch(searchWord))
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete='off'
      className='p-2 text-gray-400 focus-whitin:text-gray-600 flex flex-col justify-center items-start'
    >
      <label className='text-white p-4'>Quel est votre recherche?</label>
      <div className='flex items-center w-full'>
        <input
          type="text"
          className='flex-1 bg-white_01 border-none placeholder-gray-
        500 outline-none text-base text-white px-4 py-2 rounded-lg mr-3'
          placeholder='Rechercher un album, un artiste, ...'
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
        <button type="submit" className='bg-green_top hover:bg-green px-4 py-2 text-white rounded-lg'>Rechercher</button>
      </div>
        {error && <p className='text-red-500'>{error}</p>}
    </form>
  )
}

export default SearchBar