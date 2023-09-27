import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { useFirstRender } from '../hooks/firstRender'
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { checkIfLoggedIn } from '../reducers/userReducer'

const PrivateRoute = ({ children, first }) => {
  const dispatch = useDispatch()
  const ref = useRef(true)

  let { user } = useSelector(({ user }) => user)

  /*
  useEffect(() => {
    if (ref.current) {
      console.log('test')
      ref.current = false
      const loggedInUserJSON = window.localStorage.getItem(
        'loggedRecipeAppUser',
      )
      if (loggedInUserJSON) {
        user = JSON.parse(loggedInUserJSON)
        console.log(user)
      }
      console.log(loggedInUserJSON)
    }
  }, [])
  */

  //for first render
  const loggedInUserJSON = window.localStorage.getItem('loggedRecipeAppUser')
  if (loggedInUserJSON) {
    user = JSON.parse(loggedInUserJSON)
    //console.log(user)
  }

  //console.log(user)

  //didMountRef.current = true
  return user ? <>{children}</> : <Navigate to='/login' />
}

export default PrivateRoute
