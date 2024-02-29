import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from "react";

import MovieContext from './context/MovieContext';
import Home from './views/Home';
import NavBar from './components/NavBar';
import Signin from './views/Signin';
import Login from './views/Login';
import Profile from './views/Profile';
import Favorites from './views/Favorites';
import SearchResults from './views/SearchResults';
import PopularMovies from './views/PopularMovies';

import './App.css'

function App() {
  const [userInfo, setUserInfo ] = useState(null)

  const globalState = { setUserInfo, userInfo }

  return (
    <MovieContext.Provider value={globalState}>
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/search' element={<SearchResults/>}/>
          <Route path='/favorites' element={<Favorites/>}/>
          <Route path='/popular_movies' element={<PopularMovies/>}/>
        </Routes>
      </BrowserRouter>
    </MovieContext.Provider>
  )
}

export default App