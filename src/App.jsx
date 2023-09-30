//import { useState } from 'react'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Recipe from './components/Recipe'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Favorites from './components/Favorites'
import PrivateRoute from './components/PrivateRoute'
import { Routes, Route, useMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { checkIfLoggedIn } from './reducers/userReducer'
import recipeService from './services/recipes'
import { useEffect } from 'react'
import { useFirstRender } from './hooks/firstRender'

const App = () => {
  const dispatch = useDispatch()
  const recipeData = 'test'
  const first = useFirstRender()

  useEffect(() => {
    console.log('app test')
    dispatch(checkIfLoggedIn())
  }, [])
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
    <div className='flex h-screen flex-col'>
      <Navbar />
      <Routes>
        <Route
          path='/favorites'
          element={
            <PrivateRoute first={first}>
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/recipes/:id' element={<Recipe />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
