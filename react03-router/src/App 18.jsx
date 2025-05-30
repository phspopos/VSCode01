//import {useState} from 'react';
//import { Routes, Route, Link, NavLink } from 'react-router-dom';
//import { Outlet, useLocation, useSearchParams } from "react-router-dom";
//port { BrowserRouter } from 'react-router-dom';
//import { Routes, Route, useNavigate  } from 'react-router-dom';
//import {useState } from 'react';
import { useState, useEffect } from 'react';

const GlobalTop = (props) => {
  console.log("#Life", "GlobalTop ===> 1. 컴포넌트 실행");
  //빈 배열로 state를 선언
  var [ myList, setMyList ] = useState([]);

  useEffect( function(){
    console.log("#Life", "LifeGood ===> 3. useEffect 실행1");
    //JSON 가져오기
    fetch("./json/myData.json")
    .then( ( result ) => {
      return result.json();
    })
    .then( ( json ) => {
      console.log(json);
      setMyList(json);
    });
    return() => {
      console.log("#Life", "LifeGood ===> 4.useEffect 실행2");
    }
  }, []);

  var listTag = [];
  for( var i = 0; i < myList.length; i++ ){
    var data = myList[i];
    console.log("데이터", data.id, data.num );
    listTag.push(
      <li key={data.id}>
        <a href='{data.id}' data-id={data.num} onClick={ (e) => {
          e.preventDefault();
          props.myLinkClick( e.target.dataset.id );
        }}>{data.id}</a>
      </li>
    );
  }

  console.log("#Life", "LifeGood ==> 2. return실행 (render와 동일)");
  return(<>
    <nav>
      <ul>
        {listTag}
      </ul>
    </nav>
  </>);


  const ContentBody = ( props ) => {
    return(<>
      <div>
        <h2>{props.myResult.name}</h2>
        <ul>
          <li> num : {props.myResult.num}</li>
          <li> id : {props.myResult.id}</li>
          <li> cell : {props.myResult.cell}</li>
          <li> description : {props.myResult.description}</li>
        </ul>
      </div>
    </>);
  }
  



}

function App(){       

  var [ myResult, setMyResult ] = useState({});

  return (<>

      <div className="App">
        <h2>React - 내부서버통신</h2>      
        <GlobalTop myLinkClick = { (num) => {
          console.log("클릭", num);
          fetch( "./json/dto"+num+".json")
            .then( ( result ) => {
                return result.json();
            })
            .then( (json) => {
                console.log("결과",json);
                setMyResult(json);
            });
        }}></GlobalTop>
        <ContentBody myResult = {myResult}></ContentBody>
      </div>

  </>);
}

export default App;
