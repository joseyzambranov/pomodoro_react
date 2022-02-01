import './App.css';
import React, {useEffect, useState} from 'react';

function App() {
  const [time,setTime]=useState(1500)
  const [play,setPlay]=useState(false)

  const compInterval = setTimeout(()=>{
    if(play&&time){
      setTime(time-1)
  }
    },1000)

  const startTimeFormat=()=>{
    setPlay(true)
  }

  const stopTimeFormat=()=>{
    clearTimeout(compInterval)
    setPlay(false)
  }

  const sumTime=()=>{
    setTime(time+60)
  }

  const subTime=()=>{
    setTime(time-60)
  }

  const timeFormat =()=>{
    const min= Math.floor(time/60)
    const seg= time - min * 60
    const formatSeg=seg<10?"0"+ seg : seg;
    const formatMin=min<10?"0"+ min : min;
    return `${formatMin} : ${formatSeg}`
  }

  return (
    <div  className='container text-center'>
      <div>
        <h2 >Session Label</h2>
      <h3 id="time-left" >{timeFormat()}</h3>
      <button onClick={stopTimeFormat}>stop</button>
      <button onClick={startTimeFormat}>start</button>  
      </div> 
      <div id="break-label">Break Length</div>
      <h3>5</h3>
      <button onClick={sumTime}>+</button>
      <button onClick={subTime}>-</button>
    </div>
  );
}

export default App;
