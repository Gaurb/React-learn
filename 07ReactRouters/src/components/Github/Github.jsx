import React from 'react'
import { useLoaderData } from 'react-router-dom'

function Github() {
    const data=useLoaderData();
    
    
  return (
    <div
    className='text-center m-4 bg-gray-500 text-3xl '
    >Github Followers:{data.followers}
        <img width={300}  src={data.avatar_url}/>
    </div>
  )
}

export default Github

export const GithubLoader= async ()=>{
    const URL='https://api.github.com/users/Gaurb'
    const res= await fetch(URL);
    return res.json();
}