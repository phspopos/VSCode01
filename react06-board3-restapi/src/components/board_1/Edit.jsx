import { Link, useParams, useNavigate } from 'react-router-dom';
import React, {useEffect, useState } from 'react';

function View( props ){

  //페이지 이동을 위한 훅
  let navigate = useNavigate();
  //
  let params = useParams();
  console.log("수정 페이지 : idx", params.idx);  

  /*
    input의 value속성에 값을 설정하면 React는 readOnly 속성으로 렌더링한다<div className="따"></div>
    따라서 이 값을 수정하려면 반드시 스테이트가 필요하다.  onChange 이벤트 리스너에서 setter함수
    호출해서 값을 변경할 수 있다.
  */
 //input에 객수만큼 스테이트를 생성한다.
  const [ boardData, setBoardData ] = useState({});
  const [ writer, setWriter ] = useState(' ');
  const [ title, setTitle ] = useState(' ');
  const [ contents, setContents  ] = useState(' ');

  /* 수정페이지로 진입할때는 기존 게시물을 읽어와서 폼에 설정해야한다.
  따라서 여람API를 요청한다. */
  let requestUrl = "http://nakja.co.kr/APIs/php7/boardViewJSON.php";
  let parameter = "tname=nboard_news&idx="+params.idx+"&apikey=59ed368084146f8b2e4ba0d465e19737";

  //열람 API를 호출하여 데이터를 얻어온다.
  useEffect( function(){
      fetch( requestUrl+"?"+parameter )
      .then( ( result ) => {
        return result.json();
      })
      .then( ( json )=>{
        console.log("제이슨 : " + json );
        //얻어온 데이터를 파싱해서 스테이트의 setter함수를 호출한다.
        setBoardData( json );
        setWriter( json.name );
        setTitle( json.subject );
        setContents( json.content );
      });
      return ()=> {
        console.log("useEffect실행 ==> 컴포넌트 언마운트");        
      }
  }, []);

  console.log("데이터1 : " +  boardData.name);
  console.log("데이터2 : " +  boardData.subject);
  console.log("데이터3 : " +  boardData.content);
  
  //setWriter(boardData.name);
  //setTitle( boardData.subject);
  //setContents( boardData.content);
  console.log("이거 되냐 : "+ writer, title , contents ); 

  return(<>
    <header>
      <h2>게시판-읽기</h2>
    </header>
    <nav>      
      <Link to="/list">목록</Link>&nbsp;
      
    </nav>
       <article>
    {/* 입력값 수정후 전송 버튼을 누르면 submit이벤트가 발생된다. */}
    <form onSubmit={ (event) =>{
        event.preventDefault();

        //폼값정리(일련번호를 포함해서 내용까지 4개의 값)
        let i = event.target.idx.value;
        let w = event.target.writer.value;
        let t = event.target.title.value;
        let c = event.target.contents.value;
        console.log( i, w, t, c );
        
        //수정API호출
        fetch("http://nakja.co.kr/APIs/php7/boardEditJSON.php",{
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          },

          //수정이므로 idx가 포함되어야 한다.
          body: new URLSearchParams({
            tname: 'nboard_news',
            id: 'jsonAPI',
            name: w,
            subject: t,
            content: c,
            idx: i,
            apikey: "59ed368084146f8b2e4ba0d465e19737",
          }),
        })
        .then( ( response ) => response.json() )
        .then ( ( json ) => console.log("수정 제이슨 : " + json ) );


        //수정후 열람페이지로 이동한다.
        navigate("/view/"+params.idx );

        //경우에 따라서 목록으로 이동할수도 있다.
        //navigate("/list");

    }}>
      {/* 수정의 경우 게시물의 일련번호를 서버로 전송해야 하므로 아래와 같이
      hidden타입의 상자를 만들어서 값을 설정해야한다. hidden타입은 수정의
      대상이 아니므로 onChange 리스너는 필요하지 않다. */}
      <input type='hidden' name='idx' value={params.idx} />
      <table id="boardTable">
        <tbody>
          <tr>
            <th>작성자</th>
            {/* 스테이트에 저장된 값을 value에 설정하고, onChange 이벤트 리스너를
            통해 입력한 값을 실시간으로 변경해서 적용한다.  */}
            <td><input type="text" name="writer" value={writer} 
            onChange={ (event) =>{
              setWriter( event.target.value );
            }}/></td>
          </tr>
          <tr>
            <th>제목</th>
            <td><input type="text" name="title" value={title} 
            onChange={ (event) => {
              setTitle( event.target.value );
            }}/></td>
          </tr>
          <tr>
            <th>내용</th>
            <td><textarea name="contents" cols="22" rows="3" value={contents} 
            onChange={ (event) => {
              setContents( event.target.value );
            }}></textarea></td>
          </tr>
        </tbody>
      </table>
        <input type="submit" value="전송"/>
    </form>
    </article> 

  </>);
}

export default View;
