import { useEffect } from 'react';
import {useState} from 'react';
import { Routes, Route, Link, NavLink } from 'react-router-dom';
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
//import { Link } from "react-router-dom";
//import { useEffect, useState } from "react";
//import {firestore} from './firestoreConfig';
import { firestore } from './firestoreConfig';
import { collection, deleteDoc, doc, setDoc, getDoc, getDocs, query, where } from 'firebase/firestore';




function App(){

  const [ showData, setShowData ] = useState([]);

  //const allData = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`); // 총 100개 데이터
  const allData = showData;
  const itemsPerPage = 5; // 한 페이지당 10개
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  //const currentItems = 0;
  const totalPages = Math.ceil(allData.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allData.slice(indexOfFirstItem, indexOfLastItem);
  

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  
  


  useEffect( () => { 
  
  console.log("firestore = " + firestore);
  
  const getCollection = async () => {
    let trArray = [];

    const querySnapshot = await getDocs( collection(firestore, "board"));
    querySnapshot.forEach( (doc) => {

      //memberWrite( collection, id, pass, writer, title, contents );

      // /console.log("doc.id = " + doc.id );
      let memberInfo = doc.data();
      
      trArray.push(
        <tr key={doc.id}>
          {/* <td>{doc.collection}</td> */}
          <td>{doc.id}</td>
          <td>{memberInfo.pass}</td>
          <td>{memberInfo.writer}</td>
          <td><Link to={'/view/'+doc.id} >{memberInfo.title}</Link></td>
          <td>{memberInfo.contents}</td>
          <td>{memberInfo.date}</td>
        </tr>

      );

      
    });
    return trArray;
  }  

  getCollection().then( (result) => {
    console.log("result = " + result);
    setShowData(result);
  });



}, [setShowData]);

  

  
  return (<>
    
     <div className="board-container">
      <h2>Pagination (1~10)</h2>

      <article>
      <table className="board-table" id="boardTable" style={{ width: "900px"}}>
        <thead>
            <tr>          
              <th>아이디</th>
              <th>패스워드</th>              
              <th>작성자</th>
              <th>제목</th>
              <th>내용</th>
              <th>날짜</th>
            </tr>
          </thead>

      {currentItems.map((item, idx) => (      
          
        <tbody>
          {item}
        </tbody>   
      
      ))}
      </table>

    </article>
    
      {/* 페이지 버튼 */}
      <div style={{ marginTop: '20px' }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageClick(i + 1)}
            style={{
              margin: '0 4px',
              padding: '6px 12px',
              backgroundColor: currentPage === i + 1 ? '#007bff' : '#f0f0f0',
              color: currentPage === i + 1 ? 'white' : 'black',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>

  </>);
}


export default App;