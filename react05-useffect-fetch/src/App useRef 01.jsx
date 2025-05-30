//스테이트 사용을 위한 임포트
import { useRef, useState, useMemo, useEffect, useCallback } from 'react';
//import { Routes, Route, Link, NavLink } from 'react-router-dom';
//import { Outlet, useLocation, useSearchParams } from "react-router-dom";
//import { BrowserRouter } from 'react-router-dom'
//import { Route, Routes, Link, useNavigate } from 'react-router-dom';
//화면 이동을 위한 훅 임포트
//import { useNavigate } from 'react-router-dom';


function App() {
console.log("랜더링됨..!!");

const [ count, setCount ] = useState(0);
const countRef = useRef(0);
console.log('countRef', countRef );

const increaseCountState = () => {
  setCount( count +1 );
}

const increaseCountRef = () =>{
  countRef.current = countRef.current +1;
  console.log('Ref', countRef.current );
}


return (<>
  <div className='App'>
    <p>State : { count }</p>
    <p>Ref : { countRef.current }</p>
    <button onClick={ increaseCountState}>state증가</button>
    <button onClick={ increaseCountRef}>Ref 증가</button>
  </div>
</>);
}

export default App
