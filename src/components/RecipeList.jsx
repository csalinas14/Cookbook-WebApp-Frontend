import { useSelector } from 'react-redux'
import RecipeCard from './RecipeCard'

const RecipeList = () => {
  const { recipes, loading } = useSelector(({ recipes }) => recipes)
  //console.log(loading)
  //console.log(recipes)
  const recipesData = recipes.results || []
  if (loading && recipesData.length === 0) {
    return (
      <div className='flex flex-grow items-center justify-center'>
        <div className='flex flex-col items-center justify-center'>
          <p className='py-4 text-sm lg:text-lg'>
            First load may take awhile...
          </p>
          <span className='loading loading-spinner loading-lg text-secondary'></span>
        </div>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 gap-6 pt-6 sm:grid-cols-2 lg:grid-cols-4'>
      {recipesData.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  )
}

export default RecipeList
