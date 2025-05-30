import React, { useRef, useState } from "react";


export default function Stopwatch(props) {

  //false면 머춘상태
  const [ timerFlag, setTimerFlag ] = useState(false);

  //타이머
  let [ ticker, setTicker ] = useState(0);

  let timerRef = useRef(0);
  const startTimer = () => {
    ticker++;
    timerRef.current = setInterval( () => {
      console.log('틱톡');
      setTicker( ticker++ );
      
    }, 1000);
  }

  const stopTimer = () => {
    clearInterval( timerRef.current );
  }

  console.log("timerRef", timerRef);

  return (<>
    <div className="stopwatch">
      <h1 className="h1">StopWatch</h1>
      <span className="stopwatch-time">{ticker}</span>
      <button onClick={()=>{
         //alert('시작/정지');
         
         setTimerFlag( !timerFlag );

         console.log(" 플레그 : "+ timerFlag, "투루 펄스 : ",!timerFlag );
         (timerFlag === true ) ? stopTimer() : startTimer();         

      }}>{( timerFlag === false ) ? 'start' : 'stop'}</button>
      <button onClick={()=>{
         //alert('초기화'); 
         
         if( timerFlag === true ){
          alert("StopWatch가 동작중입니다.");
         
        }else{
          setTicker(0);
        }

      }}>Reset</button>
    </div>
  </>);
}