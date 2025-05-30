
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
//import {firestore} from './firestoreConfig';
import { firestore } from '../../firestoreConfig';
import { collection, deleteDoc, doc, setDoc, getDoc, getDocs, query, where } from 'firebase/firestore';
import '../../memberList.css';

function MemberList (){

  return(<>

<div className="board-container">

      <h2>게시판</h2>
      <table className="board-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>  
            <td>제목1</td>
            <td>김승우</td>
            <td>2025-02-25</td>
          </tr>
          <tr>
            <td>2</td>  
            <td>제목2</td>
            <td>정우성</td>
            <td>2025-05-26</td>
          </tr>
        </tbody>
      </table>
    </div>
    
  </>);

}

export default MemberList;