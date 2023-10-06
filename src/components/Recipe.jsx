import { useQuery } from '@tanstack/react-query'
import recipeService from '../services/recipes'
import { useMatch } from 'react-router-dom'
import parse from 'html-react-parser'

const Recipe = () => {
  const recipeMatch = useMatch('/recipes/:id')
  console.log(recipeMatch)
  const result = useQuery({
    queryKey: ['recipeCall'],
    queryFn: () => recipeService.getRecipeInfo(recipeMatch.params.id),
    refetchOnWindowFocus: false,
    retry: 1,
    networkMode: 'always', //when working offline
  })

  //console.log(result.fetchStatus)

  if (result.isLoading) {
    console.log('load')
  }

  if (result.isError) {
    console.log('error')
  }

  const recipeData = result.data
  console.log(recipeData)

  if (!recipeData) {
    return null
  }

  console.log(recipeData.extendedIngredients)
  console.log(recipeData.analyzedInstructions[0].steps)

  return (
    <div className='flex flex-col gap-4 p-4'>
      <div className='flex items-center justify-center'>
        <div>
          <p className='dark:text-white text-center text-4xl font-extrabold sm:text-8xl '>
            {recipeData.title}
          </p>
        </div>
      </div>
      <div className='flex items-center justify-center'>
        <img
          alt='Recipe'
          src={recipeData.image}
          className='w-full py-2 transition md:w-3/5'
        ></img>
      </div>
      <div className=''>
        <p>{parse(recipeData.summary)}</p>
      </div>
      <div className='bg-gray-100 px-2 py-3'>
        <p className='font-bold'>Ingredients:</p>
        <ul className='list-disc pl-5'>
          {recipeData.extendedIngredients.map((ingredient) => (
            <li key={ingredient.id}>{ingredient.original}</li>
          ))}
        </ul>
      </div>
      <div className='p-1'>
        <p className='font-bold'>Instructions:</p>
        <ul className='list-decimal pl-5'>
          {recipeData.analyzedInstructions[0].steps.map((step) => (
            <li key={step.number}>{step.step}</li>
          ))}
        </ul>
      </div>
      <div className='p-1'>
        <p className='italic'>
          Follow the original source for more details:{' '}
          <a
            href={recipeData.sourceUrl}
            className='text-blue-600 underline visited:text-purple-600 hover:text-blue-800'
          >
            {recipeData.sourceUrl}
          </a>
        </p>
      </div>
    </div>
  )
}

export default Recipe
