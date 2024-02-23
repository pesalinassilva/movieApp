import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from "react";

import MovieContext from './context/MovieContext';
import Home from './views/Home';
import NavBar from './components/NavBar';
import Signin from './views/Signin';
import Login from './views/Login';
import Profile from './views/Profile';
import ContentDetail from './views/ContentDetails';
import Favorites from './views/Favorites';
import SearchResults from './views/SearchResults';
ContentDetail


//import './App.css'

function App() {
  const [userInfo, setUserInfo ] = useState(null)
  const updateUserState = (user) => {
    setUserInfo(user)
  }

  const [favorites, setFavorites] = useState(null)
  const handleFavorites = (favorites) => {
    setFavorites(favorites)
  }
  
  const globalState = { updateUserState, userInfo, handleFavorites, favorites }

  console.log(favorites)
  return (
    <MovieContext.Provider value={globalState}>
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path='/home' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/detail' element={<ContentDetail/>}/>
          <Route path='/search' element={<SearchResults/>}/>
          <Route path='/favorites' element={<Favorites/>}/>
        </Routes>
      </BrowserRouter>
    </MovieContext.Provider>
  )
}

export default App