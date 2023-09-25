import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
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
      className='group col-span-1 cursor-pointer'
    >
      <div className='flex w-full flex-col items-center gap-2 sm:items-start'>
        <div className='relative aspect-square w-11/12 overflow-hidden rounded-xl group-hover:scale-110 sm:w-full'>
          <img
            alt='Recipe'
            src={recipe.image}
            className='w-full object-cover transition'
          ></img>
          <div className='rounded-b-lg bg-yellow-500 px-6 pb-14 pt-5'>
            <div className='space-y-4 text-white'>
              <h3 className='bold text-xl font-bold'>{recipe.title}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeCard
