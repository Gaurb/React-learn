import { useState } from 'react';
import './App.css'



function App() {
  const [color, setColor] = useState("olive")

  return (
    <div
      className="w-full h-screen duration-200"
      style={{ backgroundColor: color }}
    >
      <div
        className='fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2'
      >
        <div
          className='fixed flex flex-wrap justify-center shadow-lg gap-3 rounded-xl bg-white px-3 py-1'
        >
          <button
            onClick={()=>setColor("red")}
            className=' outline-none rounded-xl px-2 py-1'
            style={{ background: "red" }}
          >
            Red
          </button>
          <button
          onClick={()=>setColor("blue")}
            className=' outline-none rounded-xl px-2 py-1'
            style={{ background: "blue" }}
          >
            blue
          </button>
          <button
          onClick={()=>setColor("green")}
            className=' outline-none rounded-xl px-2 py-1'
            style={{ background: "green" }}
          >
            green
          </button>
          <button
          onClick={()=>setColor("yellow")}
            className=' outline-none rounded-xl px-2 py-1'
            style={{ background: "yellow" }}
          >
            yellow
          </button>
          <button
          onClick={()=>setColor("olive")}
            className=' outline-none rounded-xl px-2 py-1'
            style={{ background: "olive" }}
          >
            olive
          </button>
          <button
          onClick={()=>setColor("skyblue")}
            className=' outline-none rounded-xl px-2 py-1'
            style={{ background: "skyblue" }}
          >
            Sky Blue
          </button>
          <button
          onClick={()=>setColor("white")}
            className=' outline-none rounded-xl px-2 py-1'
            style={{ background: "white" }}
          >
            white
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
