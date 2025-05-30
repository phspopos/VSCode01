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
import Popup from './components/member/Popup';
import Home from './components/Home';
import TopNavi from './components/TopNavi';
import MemberView from './components/member/MemberView';
import MemberEdit from './components/member/MemberEdit';
import ModalWrite from './components/modal/modalWrite';
import ModalList from './components/modal/ModalList';
import ModalView from './components/modal/ModalView';
import ModalEdit from './components/modal/ModalEdit';
import FileUpload from './components/test/FileUpload';

//memberInsert

import RealtimeCRUD from './components2/RealtimeCRUD';
import Listener from './components2/Listener';
import ChatStart from './components2/ChatStart';
import ChatMessage from './components2/ChatMessage';



function App() {  
  
  return (<>
    <div className='App'>
      
      <TopNavi></TopNavi>

      <Routes>
       
          {/* <Route path="/real" element={ <RealtimeCRUD />} /> */}
          <Route path="/crud" element={ <RealtimeCRUD />} />
          <Route path="/listener" element={<Listener />} />
          
          <Route path="/chat">
            <Route index element={<ChatStart />} />
            <Route path="talk" element={<ChatMessage/>} />
          </Route>

        <Route path="/test" element={<FileUpload></FileUpload>} />
        
        <Route path="/" element={<Home></Home>} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/memberInsert" element={<MemberInsert></MemberInsert>} />
        <Route path="/memberList" element={<MemberList></MemberList>} />
        <Route path="/popup" element={<Popup></Popup>} />
        <Route path="/modalWrite" element={<ModalWrite></ModalWrite>} />
        <Route path="/modalList" element={<ModalList></ModalList>} />

        
        <Route path='/memberView'>
          {/* <Route path=':idx' element={<View></View>} /> */}
          <Route path=':idx' element={<MemberView/>} />
        </Route>



        <Route path="/modalEdit/:idx/:pnum" element={<ModalEdit />} />

        <Route path="/modalView/:idx/:pnum" element={<ModalView />} />
        {/* <Route path='/modalView'>          
          <Route path=':idx' element={<ModalView/>} />          
        </Route> */}

        <Route path='/memberEdit'>
          {/* <Route path=':idx' element={<View></View>} /> */}
          <Route path=':idx' element={<MemberEdit/>} />
        </Route>

      

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
