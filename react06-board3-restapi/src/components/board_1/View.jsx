import { Link, useParams, useNavigate } from 'react-router-dom';
import React, {useEffect, useState } from 'react';

function View( props ){

  //페이지 이동을 위한 훅
  let navigate = useNavigate();
  
  let params = useParams();
  console.log("idx", params.idx);

  let [ boardData, setBoardData ] = useState({});
  let requestUrl = "http://nakja.co.kr/APIs/php7/boardViewJSON.php";
  let parameter = "tname=nboard_news&idx="+params.idx+"&apikey=59ed368084146f8b2e4ba0d465e19737";

  useEffect( function(){
      fetch( requestUrl+"?"+parameter )
      .then( ( result ) => {
        return result.json();
      })
      .then( ( json )=>{
        console.log("제이슨 : " + json );
        setBoardData( json );
      });
      return ()=> {
        console.log("useEffect실행 ==> 컴포넌트 언마운트");        
      }
  }, []);

  console.log("데이터 : " +  boardData.name);
  

  return(<>
    <header>
      <h2>게시판-읽기</h2>
    </header>
    <nav>
      {/* <a href="/list">목록</a>&nbsp;
      <a href="/edit">수정</a>&nbsp;
      <a href="/delete">삭제</a>&nbsp; */}
      <Link to="/list">목록</Link>&nbsp;
      {/* 수정페이지로 진입시 일련번호가 필요하므로 링크를 수정한다. */}
      <Link to={"/edit/"+params.idx}>수정</Link>&nbsp;

      {/*  삭제를 누르면 confirm창을 먼저 뛰어서 삭제여부를 물어본다. */}
      <Link onClick={ () => {

        if( window.confirm("삭제하시겠습니까?") ){

          console.log("삭제idx", params.idx);
         //삭제 API를 호출    
          fetch("http://nakja.co.kr/APIs/php7/boardDeleteJSON.php",{
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          },

          body: new URLSearchParams({
            tname: 'nboard_news',
            //id: 'jsonAPI',
            //name: w,
            //subject: t,
            //content: c,
            idx: params.idx,
            apikey: "59ed368084146f8b2e4ba0d465e19737",
          }),
        })
          .then( ( result ) => {
            return result.json();
          })
          .then( (json) => {
            console.log(json);

            //삭제에 성공한 경우에는 목록으로 이동
            if( json.result === "success"){
              alert("삭제되었습니다.");
              navigate("/list");
            
            }else{
              alert("삭제에 실패했습니다.");
            }

          });
        }
                
      }}>삭제</Link>
      
    </nav>
      <article>
      <table id="boardTable">
        <colgroup>
          <col width="30%"/>
          <col width="*" />          
        </colgroup>
        <tbody>
          <tr>
            <th>작성자</th>
            <td>{ boardData.name }</td>
          </tr>
          <tr>
            <th>제목</th>
            <td>{ boardData.subject }</td>
          </tr>
          <tr>
            <th>날짜</th>
            <td>{ boardData.regdate }</td>
          </tr>
          <tr>
            <th>내용</th>
            {/* HTML 태그가 그대로 출력됨 */}
            {/* <td>{boardData.content}</td> */}
            {/* 마크업이 적용된 상태로 출력됨 */}
            {/*이미지가 테이블의 크기보다 큰 경우에는 450px로 맞춰서 출력한다<div className="inxe"></div>
            index.css에 설정되어 있다.  */}
            <td dangerouslySetInnerHTML={ {__html: boardData.content } } style={ { 'whiteSpace' : 'pre-wrap' } }
            className='tableImg'></td>
          </tr>
        </tbody>
      </table>
    </article>
  </>);
}

export default View;
