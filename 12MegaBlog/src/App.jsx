import { use, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Header, Footer } from './components';
import { Outlet } from 'react-router-dom'
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
    
   return !loading ? (
    <div className='h-screen w-full flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
      <Header />
      <main className='flex-1 w-full'>
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : null
}

export default App
