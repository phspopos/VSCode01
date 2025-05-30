//스테이트 사용을 위한 임포트
import {useState, useMemo, useEffect } from 'react';
//import { Routes, Route, Link, NavLink } from 'react-router-dom';
//import { Outlet, useLocation, useSearchParams } from "react-router-dom";
//import { BrowserRouter } from 'react-router-dom'
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
//화면 이동을 위한 훅 임포트
//import { useNavigate } from 'react-router-dom';


function App() {
  const [number, setNumber ] = useState(0);  
  const [ switching, setSwitching ] = useState(true);

  const switchMode = { nowState : switching ? "On(켜짐)" : "Off(꺼짐 ㅜㅜ)"};

  //step1
  useEffect ( () => {
    console.log("useEffect() 호출됨");
  }, [switchMode]);

return (<>
  <div className="APP">
    <h2>정수 카운터</h2>
    <input type='number' value={number} 
    onChange={ (e) => {
      setNumber( e.target.value );
    }} />
    <hr/>
    <h2>토글 스위치</h2>
    <p>스위치상태(Step2) : { switchMode.nowState }</p>
    <button onClick={ () => setSwitching( !switching ) } >
      스위치조작
    </button>
  </div>
</>)
}

export default App
