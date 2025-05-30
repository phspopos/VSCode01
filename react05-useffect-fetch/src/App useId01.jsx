//스테이트 사용을 위한 임포트
import { useId, useRef, useState, useMemo, useEffect, useCallback } from 'react';
//import { Routes, Route, Link, NavLink } from 'react-router-dom';
//import { Outlet, useLocation, useSearchParams } from "react-router-dom";
//import { BrowserRouter } from 'react-router-dom'
//import { Route, Routes, Link, useNavigate } from 'react-router-dom';
//화면 이동을 위한 훅 임포트
//import { useNavigate } from 'react-router-dom';



function App() {
  const myId = useId();
  console.log("myId", myId);
  

return (<>
  <div className='App'>
    <MyInput />
  </div>
</>);
}

function MyInput(){
  const ageId = useId();
  console.log("ageId", ageId);

  return(<>
    <div>
      <label htmlFor='name'>이름</label>
      <input type='text' id='name' />
      <br/>
      <label htmlFor={ageId}>나이</label>
      <input type='text' id={ageId} />
    </div>
  </>);
}

export default App
