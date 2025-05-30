import { useState, useNavigate } from 'react'

const nowDate = () => {
  //현재날짜
  
  let dateObj = new Date();
  var year = dateObj.getFullYear();
  var month =("0" + (dateObj.getMonth()+1)).slice(-2);
  var day = ("0" + dateObj.getDate()).slice(-2);
  var hours = dateObj.getHours();
  var min = dateObj.getMinutes();
  return year + "-" + month + "-" + day + " " + hours +" : "+min;
}

function BoardView( props ){
    return (<>
    {/* <!-- 게시판 열람 --> */}
        <div class="card mb-4">
            <div class="card-body">
                <h5 class="card-title">댓글 작성 구현하기</h5>
                <p class="card-text">
                    구현할 기능은 댓글작성, 좋아요, 수정, 삭제입니다. <br/>
                    기능 구현은 아래 댓글 작성부터 하면 됩니다. 
                </p>
            </div>
            </div>
    </>);
}

const CommendBtn= (props) => {
  return(<>
  {/* <!-- 댓글 작성 버튼 --> */}
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#commentModal">
            댓글 작성
        </button></>)  
}

function ModalWindow(props) {
    
    const insert = () => {
      
      let name = document.getElementById("commentAuthor").value;
      let contents = document.getElementById("commentContent").value;      
      console.log( name, contents );
        
      let addBoardData = { no:props.nextNo, name:name, contents:contents, date:nowDate(), likes:0 };
      let newBoardData = [...props.boardData, addBoardData ];
      
      //props.setBoardData( [...props.boardData, addBoardData ] );      
      console.log('넘버 :  ' , props.nextNo + 1);
      var num = props.nextNo + 1;
      props.setNextNo( num  );

      props.setBoardData( newBoardData );
      console.log(" 뭔가있나 "+ props.boardData.length );

      console.log( " 333 : " + addBoardData.name );
      //console.log( " 444 : "+props.boardData[0].name );

      //setBoardData();
      //props.setBoardData();
    
    }

  return (<>      

        {/* <!-- 댓글 작성 Modal -->         */}
        <div class="modal fade" id="commentModal" tabIndex="-1" aria-labelledby="commentModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="commentModalLabel">댓글 작성</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        {/* <!-- 작성자명 입력 상자 추가 --> */}
                        <div class="mb-3">
                            <label for="commentAuthor" class="form-label">작성자명</label>
                            <input type="text" class="form-control" id="commentAuthor" placeholder="이름을 입력하세요" />
                        </div>
                        {/* <!-- 댓글 입력 상자 --> */}
                        <label for="commentContent" class="form-label">댓글 내용</label>
                        <textarea class="form-control" id="commentContent" rows="3" placeholder="댓글을 입력하세요"></textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                        <button type="button" class="btn btn-primary" onClick={insert}>작성</button>
                    </div>
                </div>
            </div>
        </div>

  </>); 
}

function CommentList(props) {
    
    const getLike = ( no, likes, len  ) => {

        var board  = props.boardData;
        let newBoard = [];
        console.log('길이 1 :  ' + board.length );

        var count = 0;

        //var num = props.nextNo-1;

        for( let i = 0; i < board.length; i++ ){
            console.log('111');
            if( board[i].no === no ){
                console.log('들어온다.');
                newBoard.push( board[i] );
                //count++;
            }

            //count++;
            newBoard.push( board[i] );
        }

        console.log("카운트 : "+ count);
        console.log( " 길이2 : "+newBoard.length  );
        props.setBoardData( newBoard ); 
    }
    

    const getLike2 = ( no, likes, len  ) => {
    
        //alert("1111");        
        //var like2 = document.getElementById("like2");
        //console.log("현제 라이크 : " + like2);

        console.log( "넘버 와 라이크 와 길이 : "+no, likes, len );
       let addTemp = [];

        //for( let j= 0; j < ( props.nextNo -1) ; j++ ){
        for( let i= 0; i < props.boardData.length ; i++ ){
             
            console.log('보드 길이 : ' + props.boardData.length );
            console.log('넘버2 : ' + props.boardData[i].no );

            if( props.boardData[i].no === no  ){

                //console.log("들어온다.");
                props.boardData[i].likes = likes + 1 
                addTemp.push( props.boardData[i] );

                //propes.boardData.push( props.boardData[i] );
                //like2.value = "";
                //like2.value= props.boardData[i].likes = likes + 1;
                //like.value = likes + 1;
            }

            addTemp.push( props.boardData[i]);
            
        }

        console.log('addTemp길이  : ' + addTemp.length );
        props.setBoardData(addTemp);
    }

    

//   const getLike = (no) => {

//     const updatedData = props.boardData.map((item) => {
//         if (item.no === no) {
//         return { ...item, likes: item.likes + 1 };
//         }
//         return item;
//     });

//     props.setBoardData(updatedData);
// };


    var listArr = [];
     //let addBoardData = { no:props.nextNo, name:name, contents:contents, date:nowDate(), likes:0 };
    for( let i = 0; i < props.boardData.length; i++ ){
        console.log(" 777 : "+ props.boardData[i].no );   

    /*props.boardData.map( (row) => {
        console.log( row.name );*/
    
  return (<>
     {/* <!-- 댓글 목록 출력 --> */}
        <ul class="list-group mt-3">
            <li class="list-group-item">
                <div class="d-flex justify-content-between">
                    <div class="d-flex align-items-center">
                        {/* <strong>{"999 : " + props.boardData[i].name}</strong> <small class="ms-2">{ props.boardData[i].date}</small> */}
                        <strong>{"999 : " + props.boardData[i].name}</strong> <small class="ms-2">{ props.boardData[i].date}</small> 
                    </div>
                    <div>
                        {/* onClick={ getLike(props.boardData[i].no , props.boardData[i].likes  )  } */}
                        <button class="btn btn-outline-success btn-sm" onClick={ () => getLike( props.boardData[i].no, props.boardData[i].likes, props.boardData.length ) }  id='like2'>좋아요 ({props.boardData[i].likes})</button>
                        <button class="btn btn-outline-warning btn-sm">수정</button>
                        <button class="btn btn-outline-danger btn-sm">삭제</button>
                    </div>
                </div>
                <p class="mt-2 mb-0">
                    {/* 댓글은 여기에 출력됩니다. 줄바꿈 처리도 해주세요. <br/>
                    댓글 작성과 수정은 모달창을 이용하면 됩니다.  */}
                    { props.boardData[i].contents }
                </p>
            </li>
        </ul>    
  </>); 
    //});

    
   }
   

}

    
    
    

function App() {

const [ boardData, setBoardData ] = useState([]);      
const [ nextNo, setNextNo ] = useState(1);

  return (<>
        
    <div class="container mt-4">
        
        <BoardView></BoardView>
        <CommendBtn></CommendBtn>
        <ModalWindow boardData={boardData} setBoardData={setBoardData} nextNo={nextNo} setNextNo={setNextNo}></ModalWindow>                         
  
       
       {/* <CommentList boardData={boardData} setBoardData={setBoardData}></CommentList>        */}
         
        {/* {
        boardData.map((item, index) => (
            <CommentList
            key={item.no}
            boardData={[item]} // 하나만 넘기고 싶다면 배열로
            setBoardData={setBoardData}
            />
        ))
        } */}

         {
            boardData.map((item, index) => (
                <CommentList boardData={[item]} setBoardData={setBoardData} 
                nextNo={nextNo} setNextNo={setNextNo} />
            ))
        }   

    </div>

  </>)
}

export default App
