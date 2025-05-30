import {useState} from 'react';
import { Routes, Route, Link, NavLink } from 'react-router-dom';
import { Outlet, useLocation, useSearchParams } from "react-router-dom";

const RouterHooks = () => {
    const location = useLocation();

    const [ searchParams, setSearchParams ] = useSearchParams();
    const mode = searchParams.get("mode");
    const pageNum = searchParams.get("pageNum");

    const changeMode = () => {
      const nextMode = ( mode === "list" ) ? "view": "list";
      setSearchParams({
        mode : nextMode,
        pageNum
      });
    }

    const nextPage = ()=>{
    let pageTemp = ( pageNum === null || isNaN(pageNum) ) ? 1 : parseInt(pageNum) +1; 

    if( pageTemp == 11 ){
      pageTemp = 10;
      window.alert("마지막 페이지 입니다.");
    }
    setSearchParams({
      mode, 
      pageNum : pageTemp
    });

  }

  const prevPage = () => {
    let pageTemp = ( pageNum === null || isNaN(pageNum) ) ? 1 : parseInt(pageNum) - 1;

    if( pageTemp === 0 ){
      pageTemp = 1;
      window.alert("첫번째 페이지 입니다.");
    }

    setSearchParams({
      mode, 
      pageNum : pageTemp
    });
  }
  /*
  return(<>
    <h2>라우터 관력 Hook </h2>
    <div>
        <ul>
          <li>URL : {location.pathname }</li>
          <li>퀄리스트링{ location.search } </li>
          <li>mode : {mode}</li>
          <li>detail : {pageNum}</li>
        </ul>

        <button onClick={changeMode}>mode변경</button>
        <button onClick= {prevPage}>이전page</button>
        <button onClick={nextPage}>다음page</button>
    </div>
  </>);
  */
 
}



function App(){
       
  return (<>
    
      <h2>라우터 관력 Hook </h2>
    <div>
        <ul>
          <li>URL : {location.pathname }</li>
          <li>퀄리스트링{ location.search } </li>
          <li>mode : {mode}</li>
          <li>detail : {pageNum}</li>
        </ul>

        <button onClick={changeMode}>mode변경</button>
        <button onClick= {prevPage}>이전page</button>
        <button onClick={nextPage}>다음page</button>
    </div>

  </>);
}

export default App;
