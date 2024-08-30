import React, { useEffect, useState } from "react";
import { fetchSearch } from "../../redux/albums/albumSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectAlbumsData } from "../../redux/albums/albumSelector";

const SearchBar = () => {
  

  //on crée un state pour capter la valeur d el'input
  const [searchWord, setSearchWord] = useState("");
  const [error, setError] = useState('');
  
  //on récupe le hook dispatch

  const dispatch = useDispatch();
  const handleSubmit = (e) => {  
     e.preventDefault();
    if (searchWord.length < 3){
        setError('Entre au moin 3 caractère');
        return;

    }else {
        setError('')
        
        dispatch(fetchSearch(searchWord));
        

    }
  
  };
const { searchAlbum, searchArtist, searchTitle } = useSelector(selectAlbumsData);744545
  return (
    <>
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="p-2 text-gray-400 focus-whitin:text-white flex-col justify-center items-start flex"
      >
        <label className=" text-white p-4">Quel est votre recherche ? </label>
        <div className="flex items-center w-full">
          <input
            type="text"
            id=""
            className=" flex-1 bg-transparent border-none placeholder-gray-500 outline-none text-base text-white p-4"
            placeholder="Rechercher un album, un artiste, ...."
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            
          />
      


          <button
            type="submit"
            className="bg-green_top hover:bg-green px-4 py-2 text-white rounded-lg"
          >
            Recherche
          </button>
        </div>
        {error && <p className="text-red-500">{error} </p>}
      </form>
    </>
  );
};

export default SearchBar;
