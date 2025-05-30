import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
//import {firestore} from './firestoreConfig';
import { firestore } from '../../firestoreConfig';
import { collection, deleteDoc, doc, setDoc, getDoc, getDocs, query, where } from 'firebase/firestore';


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
  
    
    <header>
        <h2>게시판 - 목록</h2>
    </header>
    <nav>
      <Link to="/write">글쓰기</Link>
    </nav>

    <article>
      <table  id="boardTable">

        {/* memberWrite( collection, id, pass, writer, title, contents ); */}

          <thead>
            <tr>
              {/* <td>컬렉션</td> */}
              <td>아이디</td>
              <td>패스워드</td>              
              <td>작성자</td>
              <td>제목</td>
              <td>날짜</td>
            </tr>
          </thead>
          <tbody>
            {showData}
          </tbody>
      </table>
    </article>
  </>);

}

export default List;




