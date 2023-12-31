import { useSelector, useDispatch } from 'react-redux'
import recipeService from '../services/recipes'
import { useNavigate } from 'react-router-dom'
import TrashButton from './TrashButton'
import { useEffect } from 'react'
import { getCurrentFavorites } from '../reducers/userReducer'

const FavoriteView = ({ recipe }) => {
  const navigate = useNavigate()

  const handleRecipe = (event) => {
    event.preventDefault()
    navigate(`/recipes/${recipe.spoonId}`)
  }
  return (
    <div>
      <div
        onClick={handleRecipe}
        className='relative flex w-full cursor-pointer flex-row py-4'
      >
        <div className='flex w-1/2 flex-grow-0 lg:max-w-md lg:flex-grow'>
          <img
            alt='Recipe'
            src={recipe.image}
            className='mask mask-squircle flex flex-grow'
          ></img>
        </div>
        <div className='flex'>
          <p className='font-header text-2xl md:p-8 md:text-5xl'>
            {recipe.title}
          </p>
        </div>
        <div className='flex'>
          <div className='absolute right-1 top-16 lg:right-16'>
            <TrashButton recipeData={recipe} />
          </div>
        </div>
      </div>
      <div className='divider m-0'></div>
    </div>
  )
}

const Favorites = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(({ user }) => user)

  console.log(user)
  if (!user) {
    return null
  }
  console.log(user)
  return (
    <div className=''>
      <h1 className='font-header py-6 text-center text-6xl md:text-8xl'>
        My Recipes
      </h1>
      <div className='divider m-0'></div>
      <div className='flex w-full flex-col'>
        {user.recipes.map((recipe) => (
          <FavoriteView key={recipe.spoonId} recipe={recipe} />
        ))}
      </div>
    </div>
  )
}

export default Favorites
