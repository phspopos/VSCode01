//스테이트 사용을 위한 임포트
import { useRef, useState, useMemo, useEffect, useCallback } from 'react';
//import { Routes, Route, Link, NavLink } from 'react-router-dom';
//import { Outlet, useLocation, useSearchParams } from "react-router-dom";
//import { BrowserRouter } from 'react-router-dom'
//import { Route, Routes, Link, useNavigate } from 'react-router-dom';
//화면 이동을 위한 훅 임포트
//import { useNavigate } from 'react-router-dom';


function App() {

  const inputRef = useRef();

  useEffect( () => {
    console.log( inputRef );
    inputRef.current.focus();
  }, []);

  const login = ()=>{
    alert(`환영합니다. ${inputRef.current.value}`);
    inputRef.current.value = "";
    inputRef.current.focus();
  }


return (<>
  <div className='App'>
    <input type='text' placeholder="아이디" ref={inputRef} />
    <button onClick={ login  }>로그인</button>
  </div>
</>);
}

export default App
