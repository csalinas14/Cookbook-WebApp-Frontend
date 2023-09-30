import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import FavoriteButton from './FavoriteButton'
import recipeService from '../services/recipes'
import { useQuery } from '@tanstack/react-query'

const RecipeCard = ({ recipe }) => {
  //const recipes = useSelector(({recipes}) => recipes)
  //console.log(recipes)
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const handleRecipe = (event) => {
    event.preventDefault()
    //const searchObject = { id: recipe.id }
    //dispatch(getRecipes(searchObject))
    //result.refetch()
    //refetch()
    navigate(`/recipes/${recipe.id}`)
  }

  /*
  const { data, refetch } = useQuery({
    queryKey: ['recipeCall'],
    queryFn: () => recipeService.getRecipeInfo(recipe.id),
    refetchOnWindowFocus: false,
    retry: 1,
    enabled: false,
  })
*/
  return (
    <div
      //to={`/recipes/${recipe.id}`}
      onClick={handleRecipe}
      className='group mx-auto w-11/12 cursor-pointer overflow-hidden rounded-xl sm:w-full'
    >
      <div className='flex h-full flex-col items-center bg-yellow-500 sm:items-start'>
        <div className='relative aspect-square w-full sm:w-full'>
          <div className='w-full object-cover transition group-hover:scale-110 sm:w-full'>
            <img
              alt='Recipe'
              src={recipe.image}
              className='w-full object-cover transition'
            ></img>
            <div className='px-10 py-8 sm:px-6 sm:pt-5'>
              <div className='space-y-4 text-white'>
                <h3 className='bold text-4xl font-bold sm:text-xl'>
                  {recipe.title}
                </h3>
              </div>
            </div>
          </div>
          <div className='absolute right-7 top-7 sm:right-4 sm:top-4'>
            <FavoriteButton recipeData={recipe} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeCard
