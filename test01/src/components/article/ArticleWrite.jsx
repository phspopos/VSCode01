//게시판 작성
function ArticleWrite( props ){
  
  return(<>
    <article>
    <form onSubmit={ ( event ) =>{
      
      var title = event.target.title.value;
      var writer = event.target.writer.value;      
      var contents = event.target.contents.value;

      console.log('아티클 writeAction : ', title, writer, contents );

      props.writeAction( title, writer, contents );

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

export default ArticleWrite;