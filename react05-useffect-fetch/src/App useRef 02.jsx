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

const [ renderer, setRenderer ] = useState(0);
const countRef = useRef(0);
let countVar = 0;

const doRendring = () => {
  setRenderer( renderer + 1);
};

const increaseRef = () =>{
  countRef.current = countRef.current +1;
  console.log('Ref', countRef.current );
};

const increaseVar = () => {
  countVar = countVar + 1;
  console.log("var", countVar );
};

const printResult = () => {
  console.log(`ref:${countRef.current}, var : ${countVar} `);
};

return (<>
  <div className='App'>
    <p>Ref : { countRef.current }</p>
    <p>Var : { countVar }</p>
    <button onClick={ doRendring }>랜더링</button>
    <button onClick={ increaseRef }>Ref증가</button>
    <button onClick={ increaseVar }>Var증가</button>
    <button onClick={ printResult }>Ref/Var 증가</button>
  </div>
</>);
}

export default App
