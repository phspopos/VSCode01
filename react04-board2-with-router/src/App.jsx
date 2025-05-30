//스테이트 사용을 위한 임포트
import {useState} from 'react';
//import { Routes, Route, Link, NavLink } from 'react-router-dom';
//import { Outlet, useLocation, useSearchParams } from "react-router-dom";
//import { BrowserRouter } from 'react-router-dom'
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
//화면 이동을 위한 훅 임포트
//import { useNavigate } from 'react-router-dom';

import List from './components/board/List';
import View from './components/board/View';
import Write from './components/board/Write';
import Delete from './components/board/Delete';
import Edit from './components/board/Edit';
import NotFound from './components/common/NotFound';


const nowDate = () => {
  //현재날짜
  
  let dateObj = new Date();
  var year = dateObj.getFullYear();
  var month =("0" + (dateObj.getMonth()+1)).slice(-2);
  var day = ("0" + dateObj.getDate()).slice(-2);
  return year + "-" + month + "-" + day;
}

function App() {
  const [ boardData, setBoardData ] = useState([
    { no:1, title:'오늘은 React공부하는날', writer:'낙짜샘', date:'2023-01-01'
      ,contents:'React를 뽀개봅시당' },
      { no:2, title:'어제는 Javascript공부해씸', writer:'유겸이', date:'2023-03-03'
      ,contents:'Javascript는 할게 너무 많아요' },
      { no:3, title:'내일은 Project해야징', writer:'개똥이', date:'2023-05-05'
      ,contents:'Project는 뭘 만들어 볼까?' }
  ]);

  const [ nextNo, setNextNo ] = useState(4);
  const navigate = useNavigate();

  return (<>   
   
  <div className='App'>
    <Routes>
      <Route path="/" element={<List boardData={boardData}></List>} />
      <Route path="/list" element={<List boardData={boardData}></List>} />
      <Route path="/view">
        <Route path=':no' element={<View boardData={boardData}></View>}></Route>
      </Route>
      <Route path="/write" element={<Write 
      boardData={boardData} setBoardData={setBoardData} 
      nextNo={nextNo} setNextNo={setNextNo}
      navigate={navigate} nowDate={nowDate}></Write>} />
      
      <Route path="/delete">
        <Route path=":no" element={<Delete boardData={boardData} setBoardData={setBoardData} navigate={navigate}></Delete>}></Route>
      </Route>
      <Route path="/edit">
        <Route path=":no" element={ <Edit boardData={boardData} setBoardData={setBoardData} navigate={navigate} nowDate={nowDate}></Edit>}></Route>
      </Route>  

      <Route path="*" element={<NotFound></NotFound>} />

    </Routes>
  </div>    

  </>)
}

export default App
