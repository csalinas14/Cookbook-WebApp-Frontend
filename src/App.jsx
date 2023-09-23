//import { useState } from 'react'
import Home from './components/Home'
import { Routes, Route, useMatch } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
