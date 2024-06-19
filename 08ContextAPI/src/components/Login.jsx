import React from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import UserContext from '../context/UserContext';

function Login() {
    const [data,setData]=useState(null);
    const [pass,setPass]=useState(null);

    const {setUser}=useContext(UserContext);

    const handleSubmit=(e)=>{
        e.preventDefault();
        setUser({data,pass});
    }
    
  return (
    <div>
        <h1>Login Page</h1>
        <input type='text' placeholder='Username' value={data} onChange={(e)=> setData(e.target.value)}/>
        <input type='text' placeholder='password' value={pass} onChange={(e)=> setPass(e.target.value)}/>
        <button type='submit' onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default Login