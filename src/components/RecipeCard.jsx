const RecipeCard = ({ recipe }) => {
  //const recipes = useSelector(({recipes}) => recipes)
  //console.log(recipes)
  return (
    <div
      onClick={() => console.log('go here')}
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
