import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from "react";

import MovieContext from './context/MovieContext';
import Home from './views/Home';
import NavBar from './components/NavBar';

//import './App.css'

const globalState = {}

function App() {

  return (
    <MovieContext.Provider value={globalState}>
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path='/home' element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </MovieContext.Provider>
  )
}

export default App