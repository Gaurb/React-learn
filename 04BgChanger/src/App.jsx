import { useState } from 'react';
import './App.css'



function App() {
  const [color, setColor] = useState("olive")

  let style={
    weight: "100px"
  }

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
          style={{backgroundColor: color}}
        >
          <button
            onClick={()=>setColor("red")}
            className=' outline-none rounded-xl px-2 py-1 border-2 border-solid'
            style={{ background: "red", width: "100px" }}
          >
            Red
          </button>
          <button
          onClick={()=>setColor("blue")}
            className=' outline-none rounded-xl px-2 py-1 border-2 border-solid'
            style={{ background: "blue" , width: "100px" }}
          >
            blue
          </button>
          <button
          onClick={()=>setColor("green")}
            className=' outline-none rounded-xl px-2 py-1 border-2 border-solid'
            style={{ background: "green", width: "100px"  }}
          >
            green
          </button>
          <button
          onClick={()=>setColor("yellow")}
            className=' outline-none rounded-xl px-2 py-1 border-2 border-solid'
            style={{ background: "yellow", width: "100px"  }}
          >
            yellow
          </button>
          <button
          onClick={()=>setColor("olive")}
            className=' outline-none rounded-xl px-2 py-1 border-2 border-solid'
            style={{ background: "olive", width: "100px"  }}
          >
            olive
          </button>
          <button
          onClick={()=>setColor("skyblue")}
            className=' outline-none rounded-xl px-2 py-1 border-2 border-solid'
            style={{ background: "skyblue" , width: "100px" }}
          >
            Sky Blue
          </button>
          <button
          onClick={()=>setColor("white")}
            className=' outline-none rounded-xl px-2 py-1 border-2 border-solid'
            style={{ background: "white", width: "100px"  }}
          >
            white
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
