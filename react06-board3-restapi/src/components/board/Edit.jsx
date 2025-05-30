import { useParams, Link, useNavigate  } from 'react-router-dom';
import { useState, useEffect } from 'react'

function Edit( props ){
//페이지 이동을 위한 훅
let navigate = useNavigate();  
//
let params = useParams();
console.log("idx", params.idx);

  let [ boardData, setBoardData ] = useState({});
  const [ writer, setWriter ] = useState(' ');
  const [ title, setTitle ] = useState(' ');
  const [ contents, setContents ] = useState('');

  //let requestUrl = "http://nakja.co.kr/APIs/php7/boardViewJSON.php?tname=nboard_linux&idx=1569&apikey=59ed368084146f8b2e4ba0d465e19737";
  let requestUrl ="http://nakja.co.kr/APIs/php7/boardViewJSON.php";
  //"http://nakja.co.kr/APIs/php7/boardViewJSON.php?tname=nboard_news&idx=1569&apikey=59ed368084146f8b2e4ba0d465e19737"
  //파라미터(쿼리스트링)
  let parameter = "tname=nboard_news&idx="+params.idx+"&apikey=59ed368084146f8b2e4ba0d465e19737";
  //====tname=nboard_news &apikey=59ed368084146f8b2e4ba0d465e19737

  //1차 랜더링 후 열람API 요청
  useEffect( function(){
    fetch( requestUrl + "?" + parameter )
    .then( (result) => {
      //스테이트 변경 및 리렌더링
      return result.json();    
    })
    .then( (json) => {
      console.log("제이슨 : "+json);
      setBoardData(json);
      setWriter( json.name );
      setTitle( json.subject );
      setContents( json.content );
    });
    return () => {
      console.log("useEffect실행 ==> 컴포넌트 언마운트");
    }
  }, []);

  console.log(' 수정 데티타1 : ' , writer );
  console.log(' 수정 데티타2 : ' , title );
  console.log(' 수정 데티타3 : ' , contents );

  console.log("보드데이터 : "+ boardData.name );
  
 
 //console.log( "이게 왜 안됨 : " + name, subject, content );
  

  return(<>
  
    <header>
      <h2>게시판 - 수정 </h2>
    </header>
    <nav>      
      <Link to="/list">목록</Link>
    </nav>

    <article>
    <form onSubmit={ (event) => {
      event.preventDefault();
      
      //Event 객체를 통해 입력값을 얻어옴
      var i = event.target.idx.value;
      var t = event.target.title.value;
      var w = event.target.writer.value;
      var c = event.target.contents.value;

      console.log("수정 정보 : " , i, t, w, c );

      fetch("http://nakja.co.kr/APIs/php7/boardEditJSON.php", {
        method: 'POST',
        headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',              
        },
        body: new URLSearchParams({
          tname: "nboard_news",
          id: "jsonAPI",
          name : w,
          subject : t,
          content : c,
          idx: i,
          apikey: "59ed368084146f8b2e4ba0d465e19737",
        }),
      })
      .then( ( response ) => response.json() )
      .then( (json) => console.log(" 제이슨 : "+json) );

      navigate("/list");
      
    }}>
      <input type='hidden' name='idx' value={params.idx} />
      <table id="boardTable">
        <tbody>
          <tr>
            <th>작성자</th>
            <td><input type="text" name="writer" value={writer} onChange={ (event) => {
              
              setWriter( event.target.value );

            }}/></td>
          </tr>
          <tr>
            <th>제목</th>
            <td><input type="text" name="title" value={title} onChange={ (event) => {
              setTitle( event.target.value );
            }}/></td>
          </tr>
          <tr>
            <th>내용</th>
            <td><textarea name="contents" cols="22" rows="3" value={ contents } onChange={ (event) => {
              setContents( event.target.value );
            }}></textarea></td>
          </tr>
        </tbody>
      </table>
        <input type="submit" value="전송" />
    </form>
    </article> 
    
  </>);

}

export default Edit;