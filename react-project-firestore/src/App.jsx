import { useState, useEffect } from 'react';
//import {firestore} from '../firestoreConfig';
//import { firestore } from './firestoreConfig';
//import { collection, deleteDoc, doc, setDoc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';

import Write from './components/board/Write';
import List from './components/board/List';
import View from './components/board/View';
import Edit from './components/board/Edit';
//import Delete from './components/board/delete';
import NotFound from './common/NotFound';
import Login from './login/login';
//import MemberInsert from './components/member/MemberInsert';
import MemberInsert from './components/member/MemberInsert';
import MemberList from './components/member/MemberList';

//memberInsert


function App() {  
  
  return (<>
    <div className='App'>
      
      <Routes>


        <Route path="/" element={<Login></Login>} />
        <Route path="/memberInsert" element={<MemberInsert></MemberInsert>} />
        <Route path="/memberList" element={<MemberList></MemberList>} />

        {/*        
        <Route path="/login" element={<Login></Login>} />

        <Route path="/" element={<List></List>} />
        */}
        <Route path='/list' element={<List></List>} />
        <Route path='/write' element={<Write/>} />

        <Route path='/view'>
          {/* <Route path=':idx' element={<View></View>} /> */}
          <Route path=':idx' element={<View/>} />
        </Route>

        <Route path='/edit'>
          <Route path=':idx' element={<Edit></Edit>} />
        </Route>

        <Route path='*' element={<NotFound></NotFound>} />

        {/*
        <Route path='/delete'>
          <Route path=':idx' element={<Delete></Delete>} />
        </Route>
        */}

        {/* <Route path="/" element={<List></List>} />
        <Route path='/list' element={<List></List>} />
        <Route path='/view'>
          <Route path=':idx' element={<View></View>} />
        </Route> */}
        
        {/* <Route path='*' element={<NotFound></NotFound>} /> */}

      </Routes>
    </div>  
  </>)
}

export default App
