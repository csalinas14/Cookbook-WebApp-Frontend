import { useSelector } from 'react-redux'
import RecipeCard from './RecipeCard'

const RecipeList = () => {
  const recipes = useSelector(({ recipes }) => recipes)
  const recipesData = recipes.results || []
  return (
    <div className='grid grid-cols-1 gap-6 pt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {recipesData.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  )
}

export default RecipeList
