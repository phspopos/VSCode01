import { BrowserRouter, useState, useEffect } from 'react'

//import {firestore} from './firestoreConfig';
//import { collection, deleteDoc, doc, setDoc, getDoc, getDocs, query, where } from 'firebase/firestore';


function App() {
  
  return (<>

  <BrowserRouter>
      {/* <div className="App"> */}
        <Routes>
          <Route path="/" element={ <RealtimeCRUD />} />
          <Route path="/crud" element={ <RealtimeCRUD />} />
          <Route path="/listener" element={<Listner />} />
          <Route path="/chat">
            <Route index element={<ChatStart />} />
            <Route path="talk" element={<ChatMessage/>} />
          </Route>
        </Routes>
      {/* </div> */}
  </BrowserRouter>
  
  </> );
}

export default App


