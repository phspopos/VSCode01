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
    let page
  }

}





function App(){
       
  return (<>
    
    <div className="App">

    </div>

  </>);
}

export default App;
