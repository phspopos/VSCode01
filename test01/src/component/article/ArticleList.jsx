//게시판 목록
function ArticleList( props ){
  const lists = [];

  for( let i = 0; i < props.boardData.length; i++ ){
    let row = props.boardData[i];
    lists.push(
      <tr key={row.no}>
        <td className="cen">{row.no}</td>
        <td><a href={'/read/'+row.no} onClick={(event)=> {
          event.preventDefault();
          props.onChangeMode( row.no );
        }}>{ row.title }</a></td>
        <td className="cen">{ row.writer}</td>
        <td className="cen">{row.date}</td>
      </tr>

    );
  }
  return(<>
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

export default ArticleList;