import { useState } from 'react'
import './App.css'
import Card from './components/Card'

function App() {

  return (
    <>
    <h1 className='bg-green-100 text-black p-4 rounded-xl mb-4'>Tailwind Css</h1>
    <Card username="Gaurav" image="https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg?auto=compress&cs=tinysrgb&w=600"/>
    <Card username="Alok" image="https://images.unsplash.com/photo-1546961329-78bef0414d7c?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHVzZXJ8ZW58MHx8MHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60"/>
    </>
  )
}

export default App
