import './App.css';
import { useEffect, useState} from 'react';

function App() {
  const [time,setTime]=useState(1500)
  const [breakTime,setBreakTime]=useState(5)
  const[sessionTime,setSessionTime]=useState(25)
  const [play,setPlay]=useState(false)
  const[title,setTitle]=useState("SESSION")

  const breakSumTime=()=>{
    if(breakTime<60){
    setBreakTime(breakTime+1)
    }
  }

  const breakSubTime=()=>{
    if(breakTime>1){
    setBreakTime(breakTime-1)
    }
  }
  const sessionSumTime=()=>{
    if(sessionTime<60){
      setTime(time+60)
    setSessionTime(sessionTime+1)
    }
  }

  const sessionSubTime=()=>{
    if(sessionTime>1){
      setTime(time-60)
    setSessionTime(sessionTime-1)
    }
  }

  const startTimeFormat=()=>{
    setPlay(!play)
  }
  const reset=()=>{
    setPlay(false)
    setTime(1500)
    setBreakTime(5)
    setSessionTime(25)
    setTitle("SESSION")
    const audio = document.getElementById("beep");
    audio.pause()
    audio.currentTime = 0;
    
    
  }

  const resetTimer=()=>{
    const audio = document.getElementById("beep");
    if(!time&&title==="SESSION"){
      setTime(breakTime*60)
      setTitle("BREAK")
      audio.play()
    }
    if(!time&&title==="BREAK"){
      setTime(sessionTime*60)
      setTitle("SESSION")
      audio.pause()
      audio.currentTime=0;
      
    }
  }

  const clock=()=>{
    if(play){
      resetTimer()
      const timeout=setTimeout(() => {
        setTime(time-1)
      }, 10);
      return()=>clearTimeout(timeout)
     }
        }
        
   useEffect(()=>{
   clock()
   
  },[play,time])

  const timeFormat =()=>{
    const min= Math.floor(time/60)
    const seg= time - min * 60
    const formatSeg=seg<10?"0" + seg : seg;
    const formatMin=min<10?"0" + min : min;
    return `${formatMin}:${formatSeg}`
  }
  
  
  return (
    
    <div  className='container text-center'>
      
      <div id="break-label">Break Length</div>
      <h3 id="break-length">{breakTime}</h3>
      <button disabled={play} id="break-increment" onClick={breakSumTime}>+</button>
      <button disabled={play} id="break-decrement" onClick={breakSubTime}>-</button>
    
    <div id="session-label">Session Length</div>
      <h3 id="session-length">{sessionTime}</h3>
      <button disabled={play} id="session-increment" onClick={sessionSumTime}>+</button>
      <button disabled={play} id="session-decrement" onClick={sessionSubTime}>-</button>
      <audio
      id="beep" 
      step="0.01"
      preload="auto"
      src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
    />
    <div>
    
    <h2 id="timer-label" >{title}</h2>
  <h3 id="time-left" >{timeFormat()}</h3>
  <button id="start_stop" onClick={startTimeFormat}>start/stop</button>  
  <button id="reset" onClick={reset}>Reset</button>
  </div> 
    </div>
  );
}

export default App;
