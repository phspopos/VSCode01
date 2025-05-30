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
    <MyInput2 />
  </div>
</>);
}

function MyInput1(){
  const id = useId();
  
  return(<>
    <div>
      <label htmlFor={`${id}-id`}>아이디</label>
      <input type='text' id={`${id}-id`}  name='myId' />
      <br/>
      <label htmlFor={`${id}-pass`}>패스워드</label>
      <input type='text' id={`${id}-pass`} name='myPass' />
    </div>
  </>);
}

function MyInput2(){
  const id = useId();
  
  return(<>
    <div>
      <label htmlFor={`${id}-name`}>이름</label>
      <input type='text' id={`${id}-name`}  name='myName' />
      <br/>
      <label htmlFor={`${id}-age`}>나이</label>
      <input type='text' id={`${id}-age`} name='myAge' />
    </div>
  </>);
}


export default App
