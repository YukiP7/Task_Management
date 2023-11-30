import React from 'react'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { useDispatch } from 'react-redux'

function LogoutBtn() {
    const dispatch = useDispatch() 
    const logoutHandler = () => {
        authService.logout()
        .then( () => dispatch(logout()) )
        .catch((error) => console.log(error))
    }
  return (
   <button 
   className=' px-6 py-2 duration-200 hover:bg-blue-600 rounded-full text-black bg-white'
   onClick={logoutHandler}>
    Logout
   </button>
  )
}

export default LogoutBtn