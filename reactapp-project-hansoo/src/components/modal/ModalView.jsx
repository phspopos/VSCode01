import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
//import {firestore} from './firestoreConfig';
import { firestore } from '../../firestoreConfig';
import { collection, deleteDoc, doc, setDoc, getDoc, getDocs, query, where, updateDoc } from 'firebase/firestore';
import '../../modalWrite.css';

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

const CommendBtn= () => {
  return(<>
  {/* <!-- 댓글 작성 버튼 --> */}
        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#commentModal">
            댓글 작성
        </button></>)  
}

//등록창
function ModalWindow(props) {

  const commentInsert = async ( p_collection, p_id, p_num, p_name, p_contents, p_pnum ) =>{
  //const commentInsert = async ( p_num, p_name, p_contents, p_pnum  ) =>{
     
    console.log("firestore = " + firestore);
  
    console.log('11111');
  
    await setDoc( doc( firestore, p_collection, p_id ), {
    //await setDoc( doc( firestore, "comment", p_num), {
      id: p_id,
      no : p_num,
      name: p_name,
      contents : p_contents,
      pnum : p_pnum,
      likes : 0,
      date: nowDate(),
    }) 
    
    console.log("입력성공");
    props.setBool( !props.bool );


  }
  

  const insert = () => {

    let name = document.getElementById("commentAuthor");
    let contents = document.getElementById("commentContent");
    console.log( name.value+ " : "+ contents.value );
    
    if( name.value == '' ){
      alert("이름을 입력해주세요");
      name.focus();
      return false;
    }

    if( contents.value == '' ){
      alert("내용을 입력해주세요");
      contents.focus();
      return false;
    }

    if (!props.editId) {

      //alert("우우");
      console.log("id2 들어오나");
      //부모의 no 
      let pnum = props.result.no;
      //자식의 no
      let num = props.num;
      let collection = "comment";
      let id = props.result.id+num;
    
      commentInsert( collection, id,  num, name.value, contents.value, pnum  );

      props.setNum( num + 1);
      console.log("끝까지 실행");
      name.value = '';
      contents.value ='';
      props.setBool( !props.bool );

    }else{


      // 댓글 수정
      const docRef = doc(firestore, "comment", props.editId);
      updateDoc(docRef, {
        name: name.value,
        contents: contents.value
      }).then(() => {
        console.log("수정 성공");
      });
      props.setEditId(null); // 수정 후 초기화

      name.value = '';
      contents.value = '';
      props.setBool(!props.bool);

      /*
      console.log('else 들어온다.');
      alert("하하");
      const commentInsert = async ( ) =>{
      const docRef = doc(firestore, "comment", id2);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        console.error("해당 댓글이 존재하지 않습니다.");
        return;
      }

      const memberInfo = docSnap.data();
      //const updatedLikes = (memberInfo.likes || 0) + 1;
      

      await updateDoc(docRef, {
        name: name.value,
        contents: contents.value,

          //likes: updatedLikes,
          //date: nowDate(), // 필요하다면 업데이트
      });
      
        console.log("댓글 수정이 되나:");

        // 상태 변경 → 부모 컴포넌트 리렌더링 유도
        props.setBool(!props.bool);
     
      } */
      //commentInsert();
    }
    //window.self.close();
  }

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
                            <label htmlFor="commentAuthor" className="form-label">작성자명</label>
                            <input type="text" className="form-control" id="commentAuthor" placeholder="이름을 입력하세요" />
                        </div>
                        {/* <!-- 댓글 입력 상자 --> */}
                        <label htmlFor="commentContent" className="form-label">댓글 내용</label>
                        <textarea className="form-control" id="commentContent" rows="3" placeholder="댓글을 입력하세요"></textarea>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                        <button type="button" className="btn btn-primary" onClick={() => insert()}>작성</button>
                    </div>
                </div>
            </div>
        </div>

  </>); 
}

function CommentList(props) {
  
  const [ name2, setName2 ] = useState('');
  const [ contents2, setContents2 ] = useState('');

  
  const modalDelete = async (p_id) => {
        
        if( confirm("삭제하시겠습니까") ){
            await deleteDoc( doc( firestore, "comment", p_id ));
            //navigate("/list");
            props.setBool(!props.bool);
          
          }else{
            //navigate("/eidt/"+params.idx);
            //navigate(-1);
          }
  }

  const getLike = async (p_id) => {

    const docRef = doc(firestore, "comment", p_id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.error("해당 댓글이 존재하지 않습니다.");
      return;
    }

      const memberInfo = docSnap.data();
      const updatedLikes = (memberInfo.likes || 0) + 1;

      await updateDoc(docRef, {
        likes: updatedLikes,
        //date: nowDate(), // 필요하다면 업데이트
      });
    
      console.log("좋아요 성공! 새로운 좋아요 수:", updatedLikes);

      // 상태 변경 → 부모 컴포넌트 리렌더링 유도
      props.setBool(!props.bool);
    }

    
    const getEdit = async (p_id) => {
      //alert("ㅎㅎㅎㅎ");
      console.log("아이디 : " +p_id );

      
      let name = document.getElementById("commentAuthor");
      let contents = document.getElementById("commentContent");
      console.log( name.value+ " : "+ contents.value );
           

      const docRef = doc( firestore, "comment", p_id );
      const docSnap = await getDoc(docRef);

      if( docSnap.exists() ){
        console.log("Document data : ", docSnap.data() );
        //getRows.push( docSnap.data() );
        //setResult( docSnap.data() );
        let memberInfo = docSnap.data();

        //setName2( memberInfo.name );
        //setContents2( memberInfo.contents );      
        name.value = memberInfo.name;
        contents.value = memberInfo.contents;

      }else{
        console.log("No such document!");
      }

      //name.value = name2;
      //contents.value = contents2;

      
      if( name.value == '' ){
        alert("이름을 입력해주세요");
        name.focus();
        return false;
      }

      if( contents.value == '' ){
        alert("내용을 입력해주세요");
        contents.focus();
        return false;
      }
      
       props.setEditId(p_id);
      //props.insert(p_id);
   /*   
    const docRef = doc(firestore, "comment", p_id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.error("해당 댓글이 존재하지 않습니다.");
      return;
    }

    const memberInfo = docSnap.data();
    //const updatedLikes = (memberInfo.likes || 0) + 1;
    

    await updateDoc(docRef, {
      name: name.value,
      contents: contents.value,

        //likes: updatedLikes,
        //date: nowDate(), // 필요하다면 업데이트
    });
    
      console.log("좋아요 성공! 새로운 좋아요 수:", updatedLikes);

      // 상태 변경 → 부모 컴포넌트 리렌더링 유도
      props.setBool(!props.bool);
    */




    }
    
  /*
 function getLike( p_id  ){
  //alert("666"); 
  console.log("라이크 아이디 : " + p_id );
    
      //let likes2 = 0;
      let memberInfo;
      const getMemberInfo = async () => {

        const docRef = doc( firestore, "comment", p_id );
        const docSnap = await getDoc(docRef);

        if( docSnap.exists() ){
          console.log("Document data : ", docSnap.data() );
          //getRows.push( docSnap.data() );
          //setResult( docSnap.data() );
          memberInfo = docSnap.data();
          getLikeSet(p_id);
         }else{
          console.log("No such document!");
        }
      }


      const getLikeSet = async ( p_id ) => {
      let p_num = memberInfo.num;
      let p_name = memberInfo.name;
      let p_contents = memberInfo.contents;
      let p_pnum = memberInfo.pnum;
      let p_likes = memberInfo.likes + 1;
          
       console.log(" 좋아요 : "+ p_id + " : " +p_num + " : " +p_name + " : " +p_contents + " : " +p_pnum + " : " +p_likes );
          
          //부모의 no 
          //let pnum = props.result.no;
          //자식의 no
          //let num = props.num;
          //let collection = "comment";
          //let id = props.result.id+num;
           //let name = props.modalResult.name;  
       // commentInsert( collection, p_id,  num, name.value, contents.value, pnum  );

      console.log("firestore = " + firestore);
  
      console.log('11111');
    
      await setDoc( doc( firestore, "comment", p_id ), {      
        id: p_id,
        no : p_num,
        name: p_name,
        contents : p_contents,
        pnum : p_pnum,
        likes : p_likes,
        date: nowDate(),
      }) 
    
      console.log("라이크 수정 성공");
      props.setBool( !props.bool );


      }
      
      getMemberInfo();
   
 }
  */
 //onClick={ getLike( row.id ) }


  console.log(" 프롭스 : "+ props.modalResult.length );
  //props.modalResult.map( (row) => {

    //console.log( row.no + row.name + row.contents );  
  //for( let i = 0; i < props.modalResult.length;  i++ ){
    //console.log('이름 : '+(i+1) + props.modalResult[i].name );

    //props.modalResult.map( (row) => {
    
      //console.log( row.name + row.contents );

  return (<>
     {/* <!-- 댓글 목록 출력 --> */}

    {
      props.modalResult.map((row, index) => (

        <ul className="list-group mt-3" key={index}>
          <li className="list-group-item">
            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-center">
                <strong>{row.name}</strong> <small className="ms-2">{row.date}</small>
              </div>
              <div>
                <button className="btn btn-outline-success btn-sm" onClick={() => getLike(row.id)}>
                  좋아요 ({row.likes || 0})
                </button>
                
                {/* <button className="btn btn-outline-warning btn-sm">수정</button>  */}
                <button className="btn btn-outline-warning btn-sm" data-bs-toggle="modal" data-bs-target="#commentModal" onClick={() => getEdit(row.id)}>수정</button>
                <button className="btn btn-outline-danger btn-sm" onClick={() => modalDelete(row.id)}>삭제</button>
              </div>
            </div>
            <p className="mt-2 mb-0 contWrap">
              {row.contents}
            </p>
          </li>
        </ul>
      ))
    }
     
        {/* <ul className="list-group mt-3">
            <li className="list-group-item">
                <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                        <strong>{ row.name }</strong> <small className="ms-2">{"날짜"}</small>
                    </div>
                    <div>
                        <button className="btn btn-outline-success btn-sm">좋아요 ( {'좋아요'} )</button>
                        <button className="btn btn-outline-warning btn-sm">수정</button>
                        <button className="btn btn-outline-danger btn-sm">삭제</button>
                    </div>
                </div>
                <p className="mt-2 mb-0">
                    {"컨텐츠"}
                </p>
            </li>
        </ul> */}
           
           
  </>);   
    //});
  //}
   //});
}





function ModalView(){  

  let params = useParams();
  console.log("모달뷰 idx = " + params.idx);
  console.log("모달뷰 pnum = " + params.pnum);

  let navigate = useNavigate();
  
  let getRows = [];
  //let result = [];

  const [ num, setNum ] = useState(0);
  const [ result , setResult ] = useState([]);
  const [ modalResult , setModalResult ] = useState([]);
  const [ bool, setBool] = useState(false);

  //
  const [editId, setEditId] = useState(null);


  useEffect(() => {    
    
    console.log('일일일111');
    
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

    

    const getCollection = async () => {    
    
      console.log('둘둘둘 222');
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

  
    const getCollectionChild = async () => {    
    //const getCollectionChild = async () => {
       console.log("삼삼삼"); 
       
       let getRows = [];

       //const membersRef = collection( firestore, "members");
       const membersRef = collection( firestore, "comment");
      /*where 함수는 조건에 맞는 데이터를 검색한다. 이를 통해 query함수를
      실행하여 도큐먼트를 얻어온다.*/
      console.log("111---");
      //const q = query( membersRef, where("pnum", "==", result.no ));
      console.log("레졸트 넘버 : " + params.pnum );
      const q = query( membersRef, where("pnum", "==", Number( params.pnum ) ) );
      const querySnapshot = await getDocs(q);

      console.log("222---");

      //조건에 일치하는 도큐먼트는 2개이상일 수 있으므로 forEach를 사용한다.
      querySnapshot.forEach( ( doc ) => {

        console.log("반복인출", doc.id, doc.data() );

        getRows.push( doc.data() );        
        
      });

      console.log( "겟 로 우 :  " + getRows.length );
      setModalResult( getRows );
       /*
       let modalArray = [];      
    
        const querySnapshot = await getDocs(collection(firestore, "comment"));
        console.log('1111--');  
        querySnapshot.forEach((doc) => {

          console.log('2222--');  
          modalArray.push( doc.data() );                        

        });
        
        console.log('3333--');  

        console.log("모달 어레이 : " + modalArray );
        setModalResult(modalArray);
        console.log(" 길이 : "+ modalArray.length );
        */
      }  
         
       getMemberInfo();
       console.log('aaa');
       getCollection();   
       console.log('bbb');    
       getCollectionChild();
       console.log('ccc');

  }, [bool]);


  const modalViewDelete = async (p_id, p_num ) => {
      //alert("아이디 : " + p_id +" p_num :" + p_num );  

      if( confirm("정말루 삭제하시겠습니까 댓글까지 전부 삭제가 됩니다. ") ){
      
      //console.log('111---');
      const modalRef = collection( firestore, "comment");
      /*where 함수는 조건에 맞는 데이터를 검색한다. 이를 통해 query함수를
      실행하여 도큐먼트를 얻어온다.*/
      const q = query( modalRef, where("pnum", "==", Number( p_num ) ));
      const querySnapshot = await getDocs(q);

     // console.log('222---');

       // for...of 문으로 비동기 삭제 처리
      for (const docSnap of querySnapshot.docs) {

        //console.log('3333---');
        const modalInfo = docSnap.data();

        console.log("modalInfo.id = " + modalInfo.id );  // 도큐먼트 고유 ID 출력

        await deleteDoc(doc(firestore, "comment", modalInfo.id));  // docSnap.id 사용
        //console.log('4444---');

      }

      await deleteDoc(doc(firestore, "modalBoard", p_id ));  // docSnap.id 사용
      //console.log('5555---');

      navigate("/modalList");

      }
      //조건에 일치하는 도큐먼트는 2개이상일 수 있으므로 forEach를 사용한다.
      // querySnapshot.forEach( async ( doc ) => {
        
      //   console.log('3333---');
      //   let modalInfo = doc.data();
        
      //   console.log(" modalInfo.id = " + modalInfo.id );

      //  await deleteDoc( doc( firestore, "comment", modalInfo.id ));
      //   //await deleteDoc( doc( firestore, "comment", modalInfo.id ));
      //   console.log('4444---');
      //   //console.log("반복인출", doc.id, doc.data() );
      //   //getRows.push( doc.data() );

      //});    

}





  return(<>

    <div className="form-container">
    <h2>Q&A상세보기</h2>
    <form id="registerForm" onSubmit={ (e) => {
        e.preventDefault();
        /*
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
        */

        //console.log("모달뷰 idx = " + params.idx);
        //console.log("모달뷰 pnum = " + params.pnum);
        navigate("/modalEdit/"+params.idx+"/"+params.pnum);
        
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
            <td>아이디</td>
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
            <td><textarea name="contents" className="contWrap" cols="15" rows="10" value={result.contents} readOnly></textarea></td>
          </tr>
        </tbody>
      </table>
      <div className="button-container">
        <button type="submit">수정</button>&nbsp;&nbsp;
        {/* <button onClick={ () => modalViewDelete( params.idx ) } >삭제하기</button> */}
        <input type="button" onClick={ () => modalViewDelete( result.id, result.no ) }  value="삭제하기" style={{ width: '70px', height: '50px', fontSize: '16px' }} />
      </div>
    </form>
  </div>

       <div className="container mt-4">
                
        <BoardView></BoardView>
        <CommendBtn></CommendBtn>
        <ModalWindow editId={editId} setEditId={setEditId} result={result} num={num} setNum={setNum}
         bool={bool} setBool={setBool}></ModalWindow>    
        {
          //modalResult.map( (item, index ) => {
            
          //}) 
        }                           
       
       <CommentList editId={editId} setEditId={setEditId} result={result} modalResult={modalResult} bool={bool} setBool={setBool}
       num={num} setNum={setNum}></CommentList> 
        
       
    </div>

  </>);

}

export default ModalView;