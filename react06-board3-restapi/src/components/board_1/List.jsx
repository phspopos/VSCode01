import { Link } from 'react-router-dom';
import { useState , useEffect } from 'react';


function List( props ){
  let [ boardData, setBoardData ] = useState([]);
  
  useEffect( function(){
    fetch("http://nakja.co.kr/APIs/php7/boardListJSON.php?tname=nboard_news&apikey=59ed368084146f8b2e4ba0d465e19737")
    .then( ( result ) => {
      return result.json();

    })
    .then( (json) => {
      console.log(json);
      setBoardData(json);
    });

    return () => {
      console.log("useEffect실행 ==> 컴포넌트 언마운트");
    }    
  }, []);
  
  let lists = [];

  for( let row of boardData ){
    console.log(row);

    let date = row.regdate.substring( 0, 10 );
    let subject = row.subject.substring(0, 20 );

    lists.push(
      <tr key={row.idx}>
        <td className='cen'>{row.idx}</td>
        <td><Link to={"/view/" + row.idx}>{subject}</Link></td>
        <td className='cen'>{row.name}</td>
        <td className='cen'>{date}</td>
      </tr>
    );

  }
  
  

return(<>
    <header>
      <h2>게시판-목록</h2>
    </header>
    <nav>
      {/* <a href='/write'>글쓰기</a> */}      
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
