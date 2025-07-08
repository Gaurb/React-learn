import { use, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Header, Footer } from './components';
import authService from './appwrite/auth';
import { login,logout } from './store/authAlice';


function App() {
  const [loading, setloading]= useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if(userData) {
          dispatch(login({userData}));
        }else{
          dispatch(logout());
        }
      })
      .finally(() => {
        setloading(false);
      })
  },[]);
    
  return (
    <>
      <h1 className='text-3xl font-bold underline'>A blog app</h1>
    </>
  )
}

export default App
