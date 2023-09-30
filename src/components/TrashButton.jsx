import { BsTrash, BsFillTrashFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { unfavoriteRecipe } from '../reducers/userReducer'
import { changeFavorite } from '../reducers/recipeReducer'

const TrashButton = ({ recipeData }) => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user.user)

  const handleRemove = (event) => {
    event.preventDefault()
    event.stopPropagation()

    console.log(recipeData)

    const ok = window.confirm(
      `Do you want to remove ${recipeData.title} from your favorites?`,
    )
    if (ok) {
      dispatch(changeFavorite(recipeData))
      dispatch(unfavoriteRecipe(recipeData.spoonId))
    }
  }
  return (
    <button className='relative transition' onClick={handleRemove}>
      <BsTrash className='absolute h-10 w-10 fill-gray-400' />
      <BsFillTrashFill className='h-10 w-10 fill-gray-600' />
    </button>
  )
}

export default TrashButton
