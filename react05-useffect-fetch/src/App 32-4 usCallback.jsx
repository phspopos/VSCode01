//스테이트 사용을 위한 임포트
import {useState, useMemo, useEffect, useCallback } from 'react';
//import { Routes, Route, Link, NavLink } from 'react-router-dom';
//import { Outlet, useLocation, useSearchParams } from "react-router-dom";
//import { BrowserRouter } from 'react-router-dom'
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
//화면 이동을 위한 훅 임포트
//import { useNavigate } from 'react-router-dom';

const Box = ( { createBoxStyle }) => {
  const [style, setStyle ] = useState({});

  useEffect( () => {
    
    console.log("박스 키우기");
    setStyle( createBoxStyle );

  }, [createBoxStyle]);

  return <div style={style}></div>
}


function App() {

  const [ size, setSize ] = useState(100);
  const [ isDark, setIsDark ] = useState(false);

  const createBoxStyle = useCallback(() => {
    return {
      backgroundColor: 'pink',
      width: `${size}px`,
      height: `${size}px`,
    };
  }, [size]);
  
  
return (<>
  
  <div className="APP" style={{
    background : isDark ? 'black' : "white",
  }}>
    <h2>useCallback()</h2>
    <input type='number' value={size} step={5} 
    onChange={ (e) => setSize( e.target.value ) } />

    <button onClick={ () => setIsDark(!isDark) }>테마변경</button>
    <Box createBoxStyle={createBoxStyle} />
    
  </div>

</>);
}

export default App
