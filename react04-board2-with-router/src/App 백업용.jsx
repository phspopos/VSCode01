import {useState} from 'react';
//import { Routes, Route, Link, NavLink } from 'react-router-dom';
//import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import { Route, Routes, Link, NavLink, Outlet, useLocation, useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
//import { BrowserRouter } from 'react-router-dom'


import List from './components/board/List';
import View from './components/board/View';
import Write from './components/board/Write';
import NotFound from './components/common/NotFound';
import Eidt from './components/board/Edit';


function App(){
  
  const [boardData, setBoardData] =useState([
    { no:1, title:'오늘은 React공부하는날', writer:'낙짜샘', date:'2023-01-01'
      ,contents:'React를 뽀개봅시당' },
      { no:2, title:'어제는 Javascript공부해씸', writer:'유겸이', date:'2023-03-03'
      ,contents:'Javascript는 할게 너무 많아요' },
      { no:3, title:'내일은 Project해야징', writer:'개똥이', date:'2023-05-05'
      ,contents:'Project는 뭘 만들어 볼까?' }
  ]);

  return (<>
    <div className="App">
      <Routes>
        <Route path='/' element={<List boardData={boardData} />} />
        <Route path="/list" element={<List boardData={boardData} />} />
        <Route path="/view">
          <Route path=":no" element={<View boardData={boardData} />}/>          
        </Route>
        <Route path='/write' element={<Write></Write>} />
        <Route path="*" element={<NotFound></NotFound>}/>
        <Route path='/edit'>
            <Route path=':no' element={ <Edit 
            boardData={boardData} setBoardData={setBoardData}
            navige></Edit>}></Route>
        </Route>

      </Routes>
    </div>
  </>);
}

export default App;
