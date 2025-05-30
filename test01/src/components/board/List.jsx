import React from "react";
import { Link } from 'react-router-dom';

function List( props ){
  return (<>
    <header>
        <h2>게시판 - 목록</h2>
    </header>
    <nav>
     
      {/* <a href="/write">글쓰기</a> */}      
      <Link to="/write">글쓰기</Link>
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
export default List;