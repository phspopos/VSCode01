import {useState} from 'react';
//import { Routes, Route, Link, NavLink } from 'react-router-dom';
//import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route, Link } from 'react-router-dom';


import List from './component/board/List';
import View from  './component/board/View';
import Write from './component/board/Write';
import NotFourd from './component/common/NotFound';


function App(){
       
  return (<>

   <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<List></List>} />
          <Route path="/list" element={<List></List>} />
          <Route path="/view" element={ <View></View>} />
          <Route path="/write" element={<Write></Write>} />
          <Route path="*" element={ <NotFourd /> } />
        </Routes>
      </div>
    </BrowserRouter>

  </>);
}

export default App;
