//import { useState } from 'react'
import Home from './components/Home'
import Navbar from './components/Navbar'
import { Routes, Route, useMatch } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
