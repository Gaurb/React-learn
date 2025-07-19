import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  // const [multiply,setMultiply] = useState(0);
  let multiply = 5*count;

  const handleClick= ()=>{
    setCount(count+1);
    // setMultiply(5*(count+1));
  }

  return (
    <>
      <div>
        <h1>Click to Multiply by 5</h1>
        <div>
            <p>Current val: {count}</p>
            <p>Current val: {multiply}</p>
        </div>
        <button onClick={handleClick}> CLick Me</button>
      </div>
    </>
  )
}

export default App
