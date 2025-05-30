import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
//import {firestore} from './firestoreConfig';
import { firestore } from '../../firestoreConfig';
import { collection, deleteDoc, doc, setDoc, getDoc, getDocs, query, where } from 'firebase/firestore';


const memberWrite = async ( p_collection, p_id, p_pass, p_writer, p_title, p_contents ) =>{
 

  console.log("firestore = " + firestore);

  console.log('11111');

  await setDoc( doc( firestore, p_collection, p_id), {
    id: p_id,
    pass: p_pass,
    writer: p_writer,
    title: p_title,
    contents : p_contents,
  })

  
  console.log("입력성공");
}


function Write(){

  return(<>
  <header>
    <h2>게시판 - 작성</h2>
  </header>
  <nav>
    <Link to="/list">목록</Link>
  </nav>
  <article>
    <form onSubmit={ (e) => {
      e.preventDefault();

      let collection = e.target.collection.value;
      let id = e.target.id.value;
      let pass = e.target.pass.value;
      let writer = e.target.writer.value;
      let title = e.target.title.value;
      let contents = e.target.contents.value;

      if( collection === '' ){ alert("컬렉션명을 입력해주세요"); return; }
      if( id === '' ){ alert("아이디를 입력해주세요"); return; }
      if( pass === '' ){ alert("패스워드를 입력해주세요"); return; }
      if( writer === '' ){ alert("작성자를 입력해주세요"); return; }
      if( title === '' ){ alert("제목을 입력해주세요"); return; }      
      if( contents === '' ){ alert("컨텐츠명을 입력해주세요"); return; }      

      console.log( collection, id, pass, writer, title, contents );

      memberWrite( collection, id, pass, writer, title, contents );
      
      //e.target.collection.value = "";
      e.target.id.value = "";
      e.target.pass.value = "";
      e.target.writer.value = "";
      e.target.title.value = "";
      e.target.contents.value = "";

      

    }}>
      <table id="boardTable">
        <tbody>
          <tr>
            <td>컬렉션(테이블)</td>
            <td><input type="text" name="collection" value="board" /></td>
          </tr>
          <tr>
            <td>아이디</td>
            <td><input type="text" name="id" /></td>
          </tr>
          <tr>
            <td>비밀번호</td>
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
            <td><textarea name="contents" cols="22" rows="3"></textarea></td>
          </tr>
        </tbody>
      </table>
        <input type="submit" value="전송"/>
    </form>
    </article> 
  </>);

  
}

export default Write;
