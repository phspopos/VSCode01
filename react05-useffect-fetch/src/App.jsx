//스테이트 사용을 위한 임포트
import { useId, useRef, useState, useMemo, useEffect, useCallback } from 'react';
//import { Routes, Route, Link, NavLink } from 'react-router-dom';
//import { Outlet, useLocation, useSearchParams } from "react-router-dom";
//import { BrowserRouter } from 'react-router-dom'
//import { Route, Routes, Link, useNavigate } from 'react-router-dom';
//화면 이동을 위한 훅 임포트
//import { useNavigate } from 'react-router-dom';



function App() {

return (<>
  <div className='App'>
    <MyInput1 />    
  </div>
</>);
}

function MyInput1(){
  const myId = useId();
  const myRef = useRef();

  useEffect( () => {
    const button1 = document.getElementById("btn'");
    const button2 = myRef.current;
    console.log("버튼1", button1 );
    console.log("버튼2", button2 );

  }, []);
  
  function btn1Clicked(){
    const button1 = document.getElementById("btn");

    if( button1.style.backgroundColor === "black"){
      button1.style.backgroundColor = "white";
      button1.style.color = "black";
    }else{
      button1.style.backgroundColor = "black";
      button1.style.color = "white";
    }
  }

  const [ btnStyle, setBtnStyle ] = useState({
    'background-color' : 'yellow',
    'color' :'red',
  });

  const btn2Clicked = () => {

    if( btnStyle.color === 'red' ){
      setBtnStyle({
        'background-color':'blue',
        'color':'white',
      });
    }else{
      setBtnStyle({
        'background-color':'yellow',
        'color':'red',
      });
    }
  }

  return(<>
    <div>
      <button id='btn' onClick={btn1Clicked}>버튼1</button>
      <button id={myId} ref={myRef} onClick={btn2Clicked} style={btnStyle}>
        버튼2
      </button>
    </div>
  </>);
}

export default App
