//스테이트 사용을 위한 임포트
import {useState, useMemo, useEffect, useCallback } from 'react';
//import { Routes, Route, Link, NavLink } from 'react-router-dom';
//import { Outlet, useLocation, useSearchParams } from "react-router-dom";
//import { BrowserRouter } from 'react-router-dom'
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
//화면 이동을 위한 훅 임포트
//import { useNavigate } from 'react-router-dom';


function App() {

  const [ countNumber, setCountNumber ] = useState(0);
  const [ randomNumber, setRandomNumber ] = useState(0);

  const somethingGood = useCallback(() => {
    console.log(`somethingGood호출 : ${countNumber}, ${randomNumber }`);
    return;
  //},[]);
  }, [countNumber]);

  useEffect( () => {
    console.log("somethingGood() or randomGood() 변경됨");    
  }, [somethingGood]);
  
  
return (<>
  <div className="APP">
      <h2>useCallback()</h2>  
      <input type='number' value={countNumber} 
      onChange = { (e) =>{
        setCountNumber( e.target.value );
      }} />
  </div>
  <button onClick={ () =>{
    setRandomNumber( Math.random() );
  }}>난수 : ${ randomNumber }</button>
  <br />
  <button onClick={ somethingGood } >sometiongGood호출</button>
</>);
}

export default App
