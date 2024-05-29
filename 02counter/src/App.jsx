import { useState } from 'react'


function App() {
  let [counter, setcounter] = useState(0);

  var addValue = () => {
    if (counter >= 20) {
      alert("value cannot be greater than 20");
      setcounter(20);
    }
    else{
      setcounter(counter + 1);
    }
  }
  var removeValue = () => {
    if (counter <= 0) {
      alert("value cannot be smaller than 0");
      setcounter(0);
    }
    else {
      setcounter(counter - 1);
    }
  }

  return (
    <>
      <h1>Counter app</h1>
      <h2>Count is: {counter}</h2>
      <button onClick={addValue}>Add Value</button>
      <button onClick={removeValue} >remove Value</button>
    </>
  )
}

export default App
