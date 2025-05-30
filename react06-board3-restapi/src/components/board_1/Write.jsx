import { Link, useNavigate } from 'react-router-dom';

function Write( props ){

  const navigate = useNavigate();

  return(<>
    <header>
      <h2>게시판-작성</h2>
    </header>
    <nav>
      {/* <a href="/list">목록</a> */}
      <Link to="/list">목록</Link>
    </nav>

      <article>
    <form onSubmit={ (event) =>{
        event.preventDefault();

        let w = event.target.writer.value;
        let t = event.target.title.value;
        let c = event.target.contents.value;
        console.log( w, t, c );

        fetch("http://nakja.co.kr/APIs/php7/boardWriteJSON.php",{
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          },

          body: new URLSearchParams({
            tname: 'nboard_news',
            id: 'jsonAPI',
            name: w,
            subject: t,
            content: c,
            apikey: "59ed368084146f8b2e4ba0d465e19737",
          }),
        })
        .then( ( response ) => response.json() )
        .then ( ( json ) => console.log("쓰기 : " + json ) );

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