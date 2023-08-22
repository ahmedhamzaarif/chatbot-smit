import './App.css';
import { useState } from 'react';

function App() {
  const [light, setlight] = useState("on")
  let [temp, settemp] = useState(32)
  const lightOnOff = ()=>{
    if (light == "on"){
      setlight("off")
    } else{
      setlight("on")
    }
  }
  const increaseTemp = ()=>{
    let newTemp = temp++
    settemp(newTemp)
  }
  const decreaseTemp = ()=>{
    let newTemp = temp--
    settemp(newTemp)
  }
  return (
    <>
    <main style={{backgroundColor: light==="on" ? "#eee" : "#333",color:light==="on" ? "#333" : "#f7f7f7"}}>
      <button onClick={lightOnOff}>{light}</button>
      Light is {light}
    </main>
    <main style={{textAlign:"center"}}>
      <h1>{temp}°C</h1>
      <br/>
      <button onClick={increaseTemp}>+</button>
      <button onClick={decreaseTemp}>-</button>
    </main>
    </>
  );
}

export default App;
