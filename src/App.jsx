//import { useState } from 'react'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Recipe from './components/Recipe'
import Login from './components/Login'
import { Routes, Route, useMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import recipeService from './services/recipes'
import { useState } from 'react'

const App = () => {
  const recipeData = 'test'

  /*
  const [recipeApiCall, setRecipeApiCall] = useState()

  const recipeMatch = useMatch('/recipes/:id')
  console.log(recipeMatch)

  const recipes = useSelector(({ recipes }) => recipes)
  const recipesData = recipes.results || []
  console.log(recipesData)

  let recipeData = recipeMatch
    ? recipesData.find((r) => r.id === Number(recipeMatch.params.id))
    : null
*/
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/recipes/:id' element={<Recipe />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
