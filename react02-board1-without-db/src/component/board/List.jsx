import React from "react";
import { Link } from 'react-router-dom';

function List( props ){
  const lists = props.boardData.map( (row, idx) => {
    return (<>
      <tr key={row.no}>
        <td className="cen">{row.no}</td>
        <td><Link to={"/view/"+row.no}> {row.title} </Link></td>
        <td className="cen">{row.writer}</td>
        <td className="cen">{row.date}</td>
      </tr>
    </>);
  });
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
            {lists}
          </tbody>
      </table>
    </article>

  </>);
}
export default List;