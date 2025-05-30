//스테이트 사용을 위한 임포트
import {useState} from 'react';
//import { Routes, Route, Link, NavLink } from 'react-router-dom';
//import { Outlet, useLocation, useSearchParams } from "react-router-dom";
//import { BrowserRouter } from 'react-router-dom'
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
//화면 이동을 위한 훅 임포트
//import { useNavigate } from 'react-router-dom';

import List from './components/board_1/List';
import View from './components/board_1/View';
import Write from './components/board_1/Write';
//import Delete from './components/board/Delete';
import Edit from './components/board_1/Edit';
import NotFound from './components/common_1/NotFound';


const nowDate = () => {
  //현재날짜
  
  let dateObj = new Date();
  var year = dateObj.getFullYear();
  var month =("0" + (dateObj.getMonth()+1)).slice(-2);
  var day = ("0" + dateObj.getDate()).slice(-2);
  return year + "-" + month + "-" + day;
}

function App() {
  /*
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
  */

  return (<>   
   
  <div className='App'>
    <Routes>
      <Route path="/" element={<List ></List>} />
      <Route path="/list" element={<List></List>} />
      <Route path="/view">
        <Route path=':idx' element={<View></View>}></Route>
      </Route>
      <Route path="/write" element={<Write></Write>} ></Route>
          
      {/* 수정이 경우에도 열람과 마찬가지로 수정 할 게시물의 일련번호가
            필요하므로 중첩 라우팅으로 설정해야한다. */}
      <Route path="/edit">
        <Route path=":idx" element={ <Edit></Edit>}></Route>
      </Route>  

      <Route path="*" element={<NotFound></NotFound>} />

    </Routes>
  </div>    

  </>)
}

export default App
