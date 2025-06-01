import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
//import {firestore} from './firestoreConfig';
import { firestore } from '../../firestoreConfig';
import { collection, deleteDoc, doc, setDoc, getDoc, getDocs, query, where } from 'firebase/firestore';
import '../../memberList.css';

function formatDateOrTime(inputDateStr) {
  const inputDate = new Date(inputDateStr);
  const now = new Date();

  console.log( "인푹데이트 : " + inputDate );
  console.log(" 현재날짜 : " + now );
  // 시간 차 계산 (ms)
  const diffMs = now - inputDate;

  console.log("디프런트 값 : " + diffMs );

  const oneDayMs = 24 * 60 * 60 * 1000;

  if (diffMs < oneDayMs) {
    // 하루 안 지났으면 시간만 반환
    //const hours = inputDate.getHours().toString().padStart(2, '0');
    //const minutes = inputDate.getMinutes().toString().padStart(2, '0');
    //return `${hours}:${minutes}`;
    return ("0"+(now.getHours())).slice(-2) + " : " + ("0"+(now.getMinutes())).slice(-2);
  } else {
    // 하루 이상 지났으면 날짜 반환
    var year = now.getFullYear();
    var month = ("0"+(now.getMonth() +1 )).slice(-2);
    var day = ("0"+now.getDate()).slice(-2);
    return year + "-" + month + "-" + day;
  }
}


function List(){
  
  const [ showData, setShowData ] = useState([]);


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
          <td>{ formatDateOrTime(memberInfo.date) }</td>
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
    <header>
        <h2>게시판 - 목록</h2>
    </header>
    {/* style={{ textAlign: 'left', padding: '10px', backgroundColor: '#f8f9fa' }} */}
    <nav>
      <Link to="/write">글쓰기</Link>
    </nav>

    <article>
      <table className="board-table" id="boardTable" style={{ width: "900px"}}>

        {/* memberWrite( collection, id, pass, writer, title, contents ); */}

          <thead>
            <tr>
              {/* <td>컬렉션</td> */}
              <th>아이디</th>
              <th>패스워드</th>              
              <th>작성자</th>
              <th>제목</th>
              <th>내용</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            {showData}
          </tbody>
      </table>
    </article>
  </div>
  </>);

}

export default List;




