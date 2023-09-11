import './App.css';
import { useState } from 'react';

function App() {
  const [light, setlight] = useState(true)
  let [temp, settemp] = useState(32)
  const isLit = ()=>{
      setlight(!light)
  }
  return (
    <>
    <main style={{backgroundColor: light ? "#eee" : "#333",color:light ? "#333" : "#f7f7f7"}}>
      <button onClick={isLit}>{light ? "on" : "off"}</button>
      Light is {light ? "on" : "off"}
    </main>
    <main style={{textAlign:"center"}}>
      <h1>{temp}°C</h1>
      <br/>
      <button onClick={ ()=>{ settemp(temp+1)} }>+</button>
      <button onClick={ ()=>{ settemp(temp-1)} }>-</button>
    </main>
    </>
  );
}

export default App;
