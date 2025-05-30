import {useState} from 'react';
//import { Routes, Route, Link, NavLink } from 'react-router-dom';
//import { Outlet, useLocation, useSearchParams } from "react-router-dom";

import { BrowserRouter, Route, Routes, Link, useNavigate } from 'react-router-dom';

import List from './components/board/List';
import Write from './components/board/Write';
import View from './components/board/View';
import NotFound from './components/common/NotFound';


/*
   라우팅 처리를 위해 App컴포넌트를 감싸야 하므로 이와같이 App.jsx에서
   처리해도 된다. 하지만 주로 main.jsx에서 처리하는 게  좋ㄷ아
* */

const nowDate = () => {
  //현재날짜
  let dateObj = new Date();
  var year = dateObj.getFullYear();
  var month =("0"+( dateObj.getMonth() + 1 ) ).slice(-2);
  var day = (dateObj.getDate());
}


function App(){
  
  const boardData = [
    { no:1, title:'오늘은 React공부하는날', writer:'낙짜샘', date:'2023-01-01'
      ,contents:'React를 뽀개봅시당' },
      { no:2, title:'어제는 Javascript공부해씸', writer:'유겸이', date:'2023-03-03'
      ,contents:'Javascript는 할게 너무 많아요' },
      { no:3, title:'내일은 Project해야징', writer:'개똥이', date:'2023-05-05'
      ,contents:'Project는 뭘 만들어 볼까?' }
  ];

  return (<>
  {/* 첫 실행시에는 목록이 랜더링 된다. */}
   <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<List boardData={boardData}></List>} />
          <Route path="/list" element={<List boardData={boardData}></List>} />
          <Route path="/view">
            <Route path=':no' element={ <View boardData={boardData}></View>} />
          </Route>
          <Route path="/write" element={<Write></Write>} />
          <Route path="*" element={ <NotFound /> } />
        </Routes>
      </div>
    </BrowserRouter>

  </>);
}

export default App;
