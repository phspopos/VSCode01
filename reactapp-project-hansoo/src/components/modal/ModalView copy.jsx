import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
//import {firestore} from './firestoreConfig';
import { firestore } from '../../firestoreConfig';
import { collection, deleteDoc, doc, setDoc, getDoc, getDocs, query, where } from 'firebase/firestore';
import '../../modalWrite.css';

function BoardView( props ){
    return (<>
    {/* <!-- 게시판 열람 --> */}
        <div className="card mb-4">
            <div className="card-body">
                <h5 className="card-title">댓글 작성 구현하기</h5>
                <p className="card-text">
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
        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#commentModal">
            댓글 작성
        </button></>)  
}

function ModalWindow(props) {    

  


  return (<>      

        {/* <!-- 댓글 작성 Modal -->         */}
        <div className="modal fade" id="commentModal" tabIndex="-1" aria-labelledby="commentModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="commentModalLabel">댓글 작성</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {/* <!-- 작성자명 입력 상자 추가 --> */}
                        <div className="mb-3">
                            <label for="commentAuthor" className="form-label">작성자명</label>
                            <input type="text" className="form-control" id="commentAuthor" placeholder="이름을 입력하세요" />
                        </div>
                        {/* <!-- 댓글 입력 상자 --> */}
                        <label for="commentContent" className="form-label">댓글 내용</label>
                        <textarea className="form-control" id="commentContent" rows="3" placeholder="댓글을 입력하세요"></textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                        <button type="button" className="btn btn-primary" onClick={"insert"}>작성</button>
                    </div>
                </div>
            </div>
        </div>

  </>); 
}

function CommentList(props) {

  return (<>
     {/* <!-- 댓글 목록 출력 --> */}
        <ul className="list-group mt-3">
            <li className="list-group-item">
                <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                        {/* <strong>{"999 : " + props.boardData[i].name}</strong> <small class="ms-2">{ props.boardData[i].date}</small> */}
                        <strong>{"이름"}</strong> <small className="ms-2">{"날짜"}</small> 
                    </div>
                    <div>
                        {/* onClick={ getLike(props.boardData[i].no , props.boardData[i].likes  )  } */}
                        <button className="btn btn-outline-success btn-sm"  id='like2'>좋아요 ({"좋아요"})</button>
                        <button className="btn btn-outline-warning btn-sm">수정</button>
                        <button className="btn btn-outline-danger btn-sm">삭제</button>
                    </div>
                </div>
                <p className="mt-2 mb-0">
                    {/* 댓글은 여기에 출력됩니다. 줄바꿈 처리도 해주세요. <br/>
                    댓글 작성과 수정은 모달창을 이용하면 됩니다.  */}
                    { "컨텐츠" }
                </p>
            </li>
        </ul>    
  </>); 
    //});
}

function ModalView(){  

  let params = useParams();
  console.log("모달뷰 idx = " + params.idx);

  let navigate = useNavigate();
  
  let getRows = [];
  //let result = [];

  const [ num, setNum ] = useState(0);
  const [ result , setResult ] = useState([]);

  useEffect(() => {    
    
    console.log('111');
    
    const getMemberInfo = async () => {

      const docRef = doc( firestore, "modalBoard", params.idx );
      const docSnap = await getDoc(docRef);

      if( docSnap.exists() ){
        console.log("Document data : ", docSnap.data() );
        //getRows.push( docSnap.data() );
        setResult( docSnap.data() );    
      
      }else{
        console.log("No such document!");
      }   
    
    };

    console.log('222');

    const getCollection = async () => {    
      
      const querySnapshot = await getDocs(collection(firestore, "comment"));

      //console.log('222');
      let maxNum = 0;
      //const data = [];
      querySnapshot.forEach((doc) => {

        const data = doc.data();        

        if( maxNum < Number(data.no)  ){
          maxNum = Number(data.no);
        }
        console.log(' 맥스 넘버 : ' + maxNum );   

      });

      //console.log('333');      
      console.log( querySnapshot.empty );

      if( querySnapshot.empty ) {
        console.log('444');
        setNum(1);

      }else{

        setNum( maxNum +1 );

      }   
         
  }  
       getMemberInfo();
       getCollection();

  }, []);

  return(<>

    <div className="form-container">
    <h2>Q&A등록</h2>
    <form id="registerForm" onSubmit={ (e) => {
        e.preventDefault();

        var f = e.target;

        let collection = f.collection.value;
        let id = f.id.value;
        let name = f.name.value;
        let title = f.title.value;
        let contents = f.contents.value;

        console.log( collection+"  :  "+ id + "  :  " + name + " : " +title + " : " + contents );

        let no = num;

        modalBoardInsert( collection, no, id, name, title, contents );
        //modalBoardInsert( collection, id, name, contents );
        navigate("/modalList");

        
    }}>
      <table align="center" className="input-table" style={{
                        margin: '0 auto', // 가운데 정렬 핵심
                        border: '1px solid black',
                        width: '700px',
                        borderCollapse: 'collapse',
            }}>   
        <tbody>          
          <tr>
            <td>컬렉션</td>
            <td><input type="text" name="collection" value="modalBoard" readOnly/><span>{num}</span></td>
          </tr>          
          <tr>
            <td>넘버</td>
            <td>{result.no}</td>
          </tr>
          <tr>
            <td>{result.id}</td>
          </tr>
          <tr>
            <td>이름</td>
            <td>{result.name}</td>
          </tr>
          <tr>
            <td>타이틀</td>
            <td>{result.title}</td>
          </tr>
          <tr>            
            <td>내용</td>
            <td><textarea name="contents" cols="15" rows="10" value={result.contents} readOnly></textarea></td>
          </tr>
        </tbody>
      </table>
      <div className="button-container">
        <button type="submit">수정</button><button type="reset">취소</button>
      </div>
    </form>
  </div>

       <div class="container mt-4">
                
        <BoardView></BoardView>
        <CommendBtn></CommendBtn>
        <ModalWindow></ModalWindow>                               
       <CommentList></CommentList> 
       
    </div>

  </>);

}

export default ModalView;