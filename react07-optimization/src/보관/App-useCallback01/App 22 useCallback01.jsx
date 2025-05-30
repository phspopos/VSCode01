//스테이트 사용을 위한 임포트
import {useState, useMemo, useEffect } from 'react';
//import { Routes, Route, Link, NavLink } from 'react-router-dom';
//import { Outlet, useLocation, useSearchParams } from "react-router-dom";
//import { BrowserRouter } from 'react-router-dom'
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
//화면 이동을 위한 훅 임포트
//import { useNavigate } from 'react-router-dom';


function App() {

  //스테이트 생성
  const [ countNumber, setCountNumber ] = useState(0);
  const [ randomNumber, setRandomNumber ] = useState(0);

  /*
    Step 1 : 일반적인 화살표 함수선언
    스테이트 변경에 의해 App 컴포넌트가 새롭게 랜더링되면 이 함수는
    그때마다 새로운 참조값을 할당받게된다. 즉 참족갓이 계소 바뀌므로
    useEffect가 지속적으로 실행된다. javascript에서 함수 객체이기
    때문이다.
  */
  const somethingGood = () => {
    console.log(`somethingGood호출 : ${countNumber}, ${randomNumber }`);
    return;
  }

  useEffect( () => {
    console.log("somethingGood() or randomGood() 변경됨");    
  }, [somethingGood]);
  
  
return (<>
  <div className="APP">
      <h2>useCallback()</h2>  
      {/* 스핀버튼을 누를때마다 스테이트가 변경되어 리렌더링 된다. */}
      <input type='number' value={countNumber} 
      onChange = { (e) =>{
        setCountNumber( e.target.value );
      }} />
  </div>
  <button onClick={ () =>{
    {/* 버튼을 누를때마다 난수를 생성한 후 스테이트를 변경한다.*/} 
    setRandomNumber( Math.random() );
  }}>난수 : ${ randomNumber }</button>
  <br />
  {/* 버튼을 누를때마다 함수를 호출한다. */} 
  <button onClick={ somethingGood } >sometiongGood호출</button>
</>);
}

export default App
