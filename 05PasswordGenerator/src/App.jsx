import { useCallback, useEffect, useRef, useState } from "react"

function App() {
  const [length,setLength]=useState(8);
  const [numAllowed,setNumAllowed]=useState(false);
  const [charAllowed,setCharAllowed]=useState(false);
  const [password,setPassword]=useState("");

  const passwordGenerator=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numAllowed) str+="0123456789";
    if(charAllowed) str+="~`!@$%^&*(){}[]|\'.,=-_";

    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*str.length+1);
      pass+=str.charAt(char);
    }
    setPassword(pass);
  },[length,numAllowed,charAllowed,setPassword]);

  var passwordRef=useRef(null);

  var CopytoClipboard=useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password])


  useEffect(()=>{
    passwordGenerator();
  },[length,numAllowed,charAllowed,passwordGenerator]);

  return (
    <>
      <div 
      className="w-full max-w-md text-orange-500 mx-auto bg-gray-700 shadow-md rounded-lg mb-4 px-4 py-3 my-8"
      >
      <h1 className="text-white text-center text-xl py-2">Password generator</h1>
      <div
      className="flex shadow rounded-lg overflow-hidden mb-4"
      >
      <input
      type="text"
      className="outline-none py-1 px-3 w-full "
      value={password}
      placeholder="password"
      readOnly
      ref={passwordRef}
      />
      <button
      onClick={CopytoClipboard}
      className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm text-center  dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800
       px-3 py-1 shrink-0 rounded-r-lg"
      >Copy</button>
      </div>
      <div className="flex text-sm gap-x-2">
      <div className="flex items-center gap-x-1">
      <input
        className="cursor-pointer"
        min={6}
        max={100}
        type="range"
        value={length}
        onChange={(e)=>{setLength(e.target.value)}}
      />
      <label>length:{length}</label>
      </div>
      <div className="flex items-center gap-x-1">
        <input 
        defaultChecked={numAllowed}
        id="numChecked"
          type="checkbox"
          onChange={()=>{setNumAllowed((prev)=> !prev)}}
        />
      <label>Number</label>
      </div>
      <div className="flex items-center gap-x-1">
        <input 
        defaultChecked={charAllowed}
        id="charChecked"
          type="checkbox"
          onChange={()=>{setCharAllowed((prev)=> !prev)}}
        />
      <label>Character</label>
      </div>
      </div>
      </div>
    </>
  )
}

export default App
