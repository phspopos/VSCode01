//import {useState} from 'react';
//import { Routes, Route, Link, NavLink } from 'react-router-dom';
//import { Outlet, useLocation, useSearchParams } from "react-router-dom";
//port { BrowserRouter } from 'react-router-dom';
import { Routes, Route, useNavigate  } from 'react-router-dom';
import {useState } from 'react';


import List from './component/board/List';
import View from  './component/board/View';
import Write from './component/board/Write';
import NotFourd from './component/common/NotFound';

const nowDate = () => {
  let dateObj = new Date();
  var year = dateObj.getFullYear();
  var month = ( "0" + ( 1 + dateObj.getMonth() ) ).slice(-2);
  var day = ("0"+ dateObj.getDate()).slice(-2);
  return year + "-" + month + "-" + day;
}

function App(){
       
  const [ boardData, setBoardData ] =useState([
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

   <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<List boardData={boardData}></List>} />
          <Route path="/list" element={<List  boardData={boardData}></List>} />
          <Route path="/view" element={ <View boardData={boardData}></View>} />
          <Route path="/write" element={<Write boardData={boardData} 
          setBoardData={setBoardData} nextNo ={nextNo}
          setNextNo={setNextNo} navigate={navigate} 
          nowDate={nowDate}></Write>} />
          <Route path="*" element={ <NotFourd /> } />
        </Routes>
      </div>
    </BrowserRouter>

  </>);
}

export default App;
