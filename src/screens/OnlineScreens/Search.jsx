import React from 'react'
import SearchBar from '../../components/Search/SearchBar'
import { useSelector } from 'react-redux'
import { selectAlbumsData } from '../../redux/albums/albumSelector'
import SearchView from '../../components/Search/SearchView'
import PageLoader from '../../components/Loader/PageLoader'

const Search = () => {
  const {loading} = useSelector(selectAlbumsData)
  return (
    <>
   <SearchBar/> 
   {loading ? <PageLoader/> : <SearchView/>}


    </>
    
   
  )
}

export default Search