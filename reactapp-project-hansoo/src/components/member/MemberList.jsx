
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
//import {firestore} from './firestoreConfig';
import { firestore } from '../../firestoreConfig';
import { collection, deleteDoc, doc, setDoc, getDoc, getDocs, query, where } from 'firebase/firestore';
import '../../memberList.css';


function MemberList (){

  const [ showData, setShowData ] = useState([]);


  useEffect( () => { 
  
  console.log("firestore = " + firestore);
  
  const getCollection = async () => {
    let trArray = [];

    const querySnapshot = await getDocs( collection(firestore, "members2"));
    querySnapshot.forEach( (doc) => {
      
      let memberInfo = doc.data();
      
      trArray.push(
        <tr key={doc.id}>
          {/* <td>{doc.collection}</td> */}
          <td>{doc.id}</td>
          <td>{memberInfo.pw}</td>
          <td>{memberInfo.name}</td>
          <td><Link to={'/memberView/'+doc.id} >{memberInfo.addr1}</Link></td>
          <td>{memberInfo.phone1 + "-" + memberInfo.phone2 + "-" + memberInfo.phone3 }</td>
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

  

  return(<>

<div className="board-container">

      <h2>게시판</h2>
      <table className="board-table">
        <thead>
          <tr>
            <th>아이디</th>
            <th>패스워드</th>
            <th>이름</th>
            <th>주소</th>
            <th>전화번호</th>
          </tr>
        </thead>
        <tbody>
         {showData}
        </tbody>
      </table>
    </div>
    
  </>);

}

export default MemberList;