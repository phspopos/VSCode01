import {useState} from 'react';
//import { Routes, Route, Link, NavLink } from 'react-router-dom';
//import { Outlet, useLocation, useSearchParams } from "react-router-dom";


function List( props ){
  return (<>
    <header>
        <h2>게시판 - 목록</h2>
    </header>
    <nav>
      <a href="/write">글쓰기</a>
    </nav>

    <article>
      <table  id="boardTable">
          <thead>
            <tr>
              <td>no</td>
              <td>제목</td>
              <td>작성자</td>
              <td>날짜</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="cen">1</td>
              <td><a href='view/1'>오늘은 React 공부하는날</a></td>
              <td className="cen">낙짜샘</td>
              <td className="cen">2030-05-05</td>
            </tr>
          </tbody>
      </table>
    </article>

  </>);
}

function View( props ){
  return (<>
    <header>
      <h2>게시펀-읽기</h2>
    </header>
    <nav>
      <a href="/list">목록</a>&nbsp;
      <a href="/edit">수정</a>&nbsp;
      <a href="/delete">삭제</a>&nbsp;
    </nav>
    <article>
      <table id="boardTable">
        <colgroup>
          <col width="20%"/>
          <col width="*" />          
        </colgroup>
        <tbody>
          <tr>
            <th>작성자</th>
            <td>성유겸</td>
          </tr>
          <tr>
            <th>제목</th>
            <td>오늘은 React공부하는날</td>
          </tr>
          <tr>
            <th>날짜</th>
            <td>2023-05-05</td>
          </tr>
          <tr>
            <th>내용</th>
            <td>열심히 해봅시당<br/>열공 합시당</td>
          </tr>
        </tbody>
      </table>
    </article>
  </>);
}
 
function Write( props ){
  return(<>
    <header>
    <h2>게시판 - 작성</h2>
  </header>
  <nav>
    <a href="/list">목록</a>
  </nav>
  <article>
    <form>
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

function NotFound(){
  return (<>
    <div>
      <h2>Not Found</h2>
      <p>
        페이지를 찾을수 없습니다. ㅜㅜ <br/>
      </p>
    </div>
  </>);
}





function App(){
       
  return (<>
    <div className="App">
      <List></List>
      <View></View>
      <Write></Write>
      <NotFound></NotFound>
    </div>
  </>);
}

export default App;
