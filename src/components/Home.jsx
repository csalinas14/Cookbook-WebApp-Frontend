import Header from './Header'
import RecipeList from './RecipeList'
import Pagination from './Pagination'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRecipes, resetRecipes } from '../reducers/recipeReducer'
import { checkIfLoggedIn } from '../reducers/userReducer'

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, loading, error } = useSelector(({ user }) => user)
  const [searchParams, setSearchParams] = useSearchParams()

  console.log(searchParams)

  const recipe = searchParams.get('recipeString')
  const page = searchParams.get('page')
  //const id = searchParams.get('id')
  console.log(user)
  //console.log(loading)

  useEffect(() => {
    console.log('HOME USEEFFECT')
    if (!recipe && searchParams.size > 0) {
      navigate('/', { replace: true })
    }
    if (searchParams.size) {
      dispatch(getRecipes({ recipeString: recipe, page: page }, user))
    } else {
      dispatch(resetRecipes())
    }
  }, [searchParams.size, page, recipe])

  //dispatch(getRecipes({ recipeString: recipe, page: page }, user))

  return (
    <div>
      <Header />
      <RecipeList />
      <Pagination />
    </div>
  )
}

export default Home
