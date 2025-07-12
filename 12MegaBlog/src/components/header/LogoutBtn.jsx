import React from 'react'
import{useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authAlice';

function LogoutBtn() {
    const dispatch = useDispatch();

    const logoutHandler = async () => {
            authService.logout().then(() => {
                console.log("Logout successful");
                dispatch(logout());
            });
    }
  return (
    <button 
    className='inline-block px-6 py-2 duration-200 hover:bg-red-600 hover:text-white bg-red-50 text-red-700 rounded-full font-medium transition-all transform hover:scale-105 hover:shadow-md'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn