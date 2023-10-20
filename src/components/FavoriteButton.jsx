import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { favoriteRecipe, unfavoriteRecipe } from '../reducers/userReducer'
import { changeFavorite } from '../reducers/recipeReducer'

const FavoriteButton = ({ recipeData }) => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user.user)
  const [hasFavorited, setHasFavorited] = useState(recipeData.favorite)

  const toggleFavorite = (event) => {
    event.preventDefault()
    event.stopPropagation()
    //console.log(recipeData)

    //console.log(user)

    if (user) {
      if (hasFavorited) {
        console.log('unfavorite')
        //console.log(recipeData)
        const recipeObj = user.recipes.find(
          (recipe) => recipe.spoonId === recipeData.id,
        )
        console.log(recipeObj)
        dispatch(changeFavorite(recipeData))
        dispatch(unfavoriteRecipe(recipeData.id))
        setHasFavorited(!hasFavorited)
      } else {
        const recipeObj = {
          spoonId: recipeData.id,
          title: recipeData.title,
          image: recipeData.image,
        }
        dispatch(favoriteRecipe(recipeObj))
        setHasFavorited(!hasFavorited)
      }
    }
  }
  //console.log(hasFavorited)

  return (
    <button
      onClick={toggleFavorite}
      data-tip='Please Login'
      className={`relative transition hover:opacity-70 
      ${
        user
          ? 'cursor-pointer  hover:scale-125'
          : 'tooltip tooltip-left cursor-not-allowed'
      }`}
    >
      <AiOutlineStar
        className={`absolute h-12 w-12 fill-white sm:h-8 sm:w-8 ${
          hasFavorited ? 'fill-gray-700' : 'fill-white'
        }`}
      />
      <AiFillStar
        className={`h-12 w-12 sm:h-8 sm:w-8 ${
          hasFavorited ? 'fill-yellow-400' : 'fill-neutral-500/70'
        }`}
      />
    </button>
  )
}

export default FavoriteButton
