import React from "react";
import { Link } from 'react-router-dom';

function Write( props ){

  const boardData = props.boardData;
  const setBoardData = props.setBoardData;
  const nextNo = props.nextNo;
  const setNextNo = props.setNextNo;
  const navigate = props.navigate;
  const nowDate = props.nowDate;

  return(<>
    <header>
    <h2>게시판 - 작성</h2>
  </header>
  <nav>
    {/* <a href="/list">목록</a> */}
    <Link to="/list">목록</Link>
  </nav>
  <article>
    <form onSubmit={ (event ) => {
      event.preventDefault();

      let w = event.target.writer.value;
      let t = event.target.title.value;
      let c = event.target.contents.value;

      //추가할 객체 생성
      let addBoardData = { no:nextNo, writer:w, title:t, contents:c, date:nowDate() };

      //추가
      let copyBoardData = [...boardData];
      copyBoardData.push( addBoardData );
      setBoardData( copyBoardData );
      setNextNo( nextNo + 1 );
      navigate("/list");

    }}>
      <table id="boardTable">
        <tbody>
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