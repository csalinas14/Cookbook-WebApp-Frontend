import { useSelector, useDispatch } from 'react-redux'

const Favorites = () => {
  const { user } = useSelector(({ user }) => user)
  //console.log(userData)
  if (!user) {
    return null
  }

  return (
    <div>
      hello world
      <div>{user.name}</div>
    </div>
  )
}

export default Favorites
