//import {useState} from 'react';
//import { Routes, Route, Link, NavLink } from 'react-router-dom';
//import { Outlet, useLocation, useSearchParams } from "react-router-dom";
//port { BrowserRouter } from 'react-router-dom';
//import { Routes, Route, useNavigate  } from 'react-router-dom';
//import {useState } from 'react';
import { useState, useEffect } from 'react';

function LifeGood( props ){
  console.log( '#Life', 'LifeGood ==>1. 컴포넌트 실행(함수 호출)' );

  var [ myRandomNum, setMyRandomNum ] = useState( props.initNumber );
  var [ myCount, setMyCount ] = useState(1);

  useEffect( function(){
    console.log('#Life', 'useEffect실행 ==> 3.컴포넌트 마운트'); 
    return () => {
      console.log("#Life", 'useEffect실행 ==> 4. 컴포넌트 언마운트');
    }
  });
  
  console.log('#Life', "return실행 ==> 2. 렌더링(return문)");

  return(<>
    <div>
      <h4>함수형 컴포넌트의 수명주기 함수</h4>
      <p>난수 : { myRandomNum }</p>
      <p>카운트 : {myCount}</p>

      <input type='button' value="난수생성" onClick={ () => {
        setMyRandomNum( Math.random() );
      }}/>
      
      <input type='button' value="카운트" onClick = { () => {
        setMyCount( myCount + 1 );
      }} />

    </div>
  </>);

}



function App(){
       

  return (<>

      <div className="App">
        <h2>React Hook - useEffect </h2>
        <LifeGood initNumber={1}></LifeGood>
      </div>

  </>);
}

export default App;
