import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
//import {firestore} from './firestoreConfig';
import { firestore } from '../../firestoreConfig';
import { collection, deleteDoc, doc, setDoc, getDoc, getDocs, query, where } from 'firebase/firestore';
import '../../modalWrite.css';

//오늘의 날짜를 만들기 위한 함수
  const nowDate = () => {
    let dateObj = new Date();
    var year = dateObj.getFullYear();
    var month = ("0"+(dateObj.getMonth() +1 )).slice(-2);
    var day = ("0"+dateObj.getDate()).slice(-2);
    var hours = dateObj.getHours();
    var min =dateObj.getMinutes();
    console.log( dateObj.getHours() +" : "+ dateObj.getMinutes() + " : " + dateObj.getSeconds() );
    //return year + "-" + month + "-" + day + hours + ":" + min;
    return year + "-" + month + "-" + day;
  }

const memberWrite = async ( p_collection, p_id, p_pass, p_writer, p_title, p_contents ) =>{
 

  console.log("firestore = " + firestore);

  console.log('11111');

  await setDoc( doc( firestore, p_collection, p_id), {
    id: p_id,
    pass: p_pass,
    writer: p_writer,
    title: p_title,
    contents : p_contents,
    date: nowDate(),
  })

  
  console.log("입력성공");
}



function Write(){

  let navigete = useNavigate();

  return(<>
  <div className="form-container">
  <header>
    <h2>게시판 - 작성</h2>
  </header>
  {/* style={{ textAlign: 'left', padding: '10px', backgroundColor: '#f8f9fa' }} */}
  <nav>
    <Link to="/list">목록</Link>
  </nav>
  <article>
    <form onSubmit={ (e) => {
      e.preventDefault();

      let f = e.target;
      
      let collection = f.collection.value;
      let id = f.id.value;
      let pass = f.pass.value;
      let writer = f.writer.value;
      let title = f.title.value;
      let contents = f.contents.value;

      if( collection === '' ) { 
        alert("컬렉션명을 입력해주세요");
        f.collection.focus();
        return false;
      }

      if( id === '' ){
        alert("아이디를 입력해주세요");
        f.id.focus();
        return false;
      }

      if( pass === '' ){
        alert("패스워드를 입력해주세요"); 
        f.pass.focus();
        return false; 
      } 

      if( writer === '' ){ 
        alert("작성자를 입력해주세요");
        f.writer.focus();
        return false;
      }

      if( title === '' ){
        alert("제목을 입력해주세요");
        f.title.focus();
        return false; 
      }

      if( contents === '' ){
        alert("컨텐츠명을 입력해주세요"); 
        f.contents.focus();
        return false; 
      }      

      console.log( collection, id, pass, writer, title, contents );

      memberWrite( collection, id, pass, writer, title, contents );
      
      //e.target.collection.value = "";
      e.target.id.value = "";
      e.target.pass.value = "";
      e.target.writer.value = "";
      e.target.title.value = "";
      e.target.contents.value = "";

      navigete("/list");
      

    }}>
      <table id="boardTable" className="input-table">
        <tbody>
          <tr>
            <th>컬렉션(테이블)</th>
            <td><input type="text" name="collection" value="board" /></td>
          </tr>
          <tr>
            <th>아이디</th>
            <td><input type="text" name="id" /></td>
          </tr>
          <tr>
            <th>비밀번호</th>
            <td><input type="text" name="pass" /></td>
          </tr>
          <tr>
            <th>작성자</th>
            <td><input type="text" name="writer"/></td>
          </tr>
          <tr>
            <th>제목</th>
            <td><input type="text" name="title"/></td>
          </tr>
          <tr>
            <th>내용</th>
            <td><textarea name="contents" cols="22" rows="8"></textarea></td>
          </tr>
        </tbody>
      </table>
        <input type="submit" value="등록"/>
        
    </form>
    </article> 
  </div>

  </>);

  
}

export default Write;
