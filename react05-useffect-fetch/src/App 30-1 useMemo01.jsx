//스테이트 사용을 위한 임포트
import {useState, useMemo } from 'react';
//import { Routes, Route, Link, NavLink } from 'react-router-dom';
//import { Outlet, useLocation, useSearchParams } from "react-router-dom";
//import { BrowserRouter } from 'react-router-dom'
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
//화면 이동을 위한 훅 임포트
//import { useNavigate } from 'react-router-dom';

const longTimeCalculate = ( number )=>{
  console.log("시간이 많이 걸리는 계산");

  for( let i = 0; i < 1234567890; i++ ){
    return number + 10000;
  }
}

  const simpleCalculate = ( number) => {
    console.log("금방끝나는 계산");
    return number + 1; 
  }

function App() {
  
  const [ longTimeNum, setLongTimeNum ] = useState(1);
  const [ simpleNumber, setSimpleNumber ] = useState(1);

  //step1
  //const longTimeSum = longTimeCalculate( longTimeNum );
  //const simpleSum = simpleCalculate( simpleNumber );

  const longTimeSum = useMemo( () => {
    return longTimeCalculate(longTimeNum);
  }, [longTimeNum]);
  const simpleSum = simpleCalculate(simpleNumber);

return (<>
  <div className="APP">
    <h2>Long Time 계산기</h2>    
    <input type='number' value={longTimeNum} onChange={
      (e) => setLongTimeNum( parseInt( e.target.value ))} />
      <span>+1000 = { longTimeSum }</span>
      <h2>short Time 계산기</h2>
      <input type='number' value={ simpleNumber } 
      onChange={ (e) => { setSimpleNumber( parseInt(e.target.value))}} />
      <span>+1 = {simpleSum}</span>
  </div>
</>)
}

export default App
