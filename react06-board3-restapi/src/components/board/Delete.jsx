
import { useParams } from 'react-router-dom';

function Delete( props ){
  
  const params = useParams();

  const boardData = props.boardData;
  const setBoardData = props.setBoardData;
  const navigate = props.navigate;
  
  //let copyBoardData = [...boardData];
  console.log("딜리트 번호 : " + params.no );
  const no = params.no;

  let newBoardData = [];

  console.log( "사이즈 : "+boardData.length );

  for( let i = 0; i < boardData.length; i++ ){      

    if( no == boardData[i].no ){
        console.log("11111");
        
    }else{
      console.log("22222");
      newBoardData.push( boardData[i]);
    }
  }

  console.log(" 푸시 : " + newBoardData.length );

  setBoardData( newBoardData );

  
  navigate("/list");

  return(<>

    <h2>삭제 페이지 입니다.</h2>

  </>);

}

export default Delete;
