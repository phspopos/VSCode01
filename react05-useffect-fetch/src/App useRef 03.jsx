//스테이트 사용을 위한 임포트
import { useRef, useState, useMemo, useEffect, useCallback } from 'react';
//import { Routes, Route, Link, NavLink } from 'react-router-dom';
//import { Outlet, useLocation, useSearchParams } from "react-router-dom";
//import { BrowserRouter } from 'react-router-dom'
//import { Route, Routes, Link, useNavigate } from 'react-router-dom';
//화면 이동을 위한 훅 임포트
//import { useNavigate } from 'react-router-dom';


function App() {
const [ count, setCount ] = useState(1);

//무한루트에 빠지게 됨
//const [ renderCount, setRenderCount ] = useState(1);
// useEffect ( () => {
//   console.log("렌더링01", renderCount );
//   setRenderCount( renderCount + 1 );
// });

const renderCount = useRef(1);
useEffect( () => {
  console.log("랜더링02", renderCount.current );
  renderCount.current = renderCount.current + 1;
});

return (<>
  <div className='App'>
    <p>Count : { count  }</p>
    <button onClick={ () => setCount(count+1)  }>카운트 증가</button>
  </div>
</>);
}

export default App
