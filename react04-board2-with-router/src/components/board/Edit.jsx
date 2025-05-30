import { useParams, Link } from 'react-router-dom';
import { useState } from 'react'

function Edit( props ){

  const params = useParams();
  const boardData = props.boardData;
  const setBoardData = props.setBoardData;
  const navigate = props.navigate;
  const nowDate = props.nowDate;
  
  console.log("수정 파람 넘버 : " +  params.no );
  const no = Number( params.no );
  let newBoardData = [];

  /*
  for( let i = 0; i < boardData.length; i++ ){

    if( no == boardData[i].no ){
      console.log("11111");
      newBoardData.push( boardData[i] );
      break;
    }
  }*/
  let vi = boardData.reduce( ( prev, curr ) => {
    if( curr.no == no ){
      prev = curr;
    }
    return prev;
  }, {} ); 

  const [ title, setTitle ] = useState( vi.title );
  const [ writer, setWriter ] = useState( vi.writer );
  const [ contents, setContens ] = useState( vi.contents );

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
      var t = event.target.title.value;
      var w = event.target.writer.value;
      var c = event.target.contents.value;

      console.log("수정 정보 : " , t, w, c );
      //추가할 객체 생성
      let editBoardData = { no:no, writer:w, title:t,  contents:c, date:nowDate() };

      //복사본을 생성한 후  데이터를 추가한다.
      let copyBoardData = [...boardData];
      for( let i = 0; i < copyBoardData.length; i++ ){
        if( copyBoardData[i].no == no ){
          //변경한다.
          copyBoardData[i] = editBoardData;
          break;
        }
      }

      setBoardData( copyBoardData );
      navigate("/list");
      
      //let editBoardData = { no:no, title:t, writer:w, contents:c, date:selectRow.date };
     
      /*
      let copyBoardData=[];
      console.log( "뉴 보드 : "+ newBoardData );
      
      for( let i = 0; i < boardData.length; i++ ){

        if( no == boardData[i].no){
          console.log("일 : 11111");
          copyBoardData.push( newBoardData );

        }else{
          console.log("투: 2222");
          copyBoardData.push( boardData[i] );
        }

      }


      for( let row of copyBoardData ){
        console.log( "넘버 : " + row.no );
      } 
      
      //setBoardData( copyBoardData );
      setBoardData( copyBoardData);

      navigate("/list");
      */
    }}>
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
            <td><textarea name="contents" cols="22" rows="3" value={contents} onChange={ (event) => {
              setContens( event.target.value );
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