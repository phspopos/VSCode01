import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
//import {firestore} from './firestoreConfig';
import { firestore } from '../../firestoreConfig';
import { collection, deleteDoc, doc, setDoc, getDoc, getDocs, query, where } from 'firebase/firestore';


const boardEdit = async ( p_collection, p_id, p_pass, p_writer, P_title, p_contents ) => {
  await setDoc( doc( firestore, p_collection, p_id),{
    id: p_id,
    pass: p_pass,
    writer: p_writer,
    title: P_title,
    contents: p_contents,
  });
  console.log("수정성공");
  //getMemberInfo();
}

function edit(){

  //const [ showData, setShowData ] = useState([]);
  let memberInfo = [];

  let params = useParams();
  console.log("idx777 = " + params.idx);
  
  let getRows = [];
  //let result = [];

  const [ result , setResult ] = useState([]);

  const [ pass, setPass ] = useState('');
  const [ writer, setWriter ] = useState('');
  const [ title, setTitle ] = useState('');
  const [ contents, setContents ] = useState('');

  let navigate = useNavigate();

  //pass writer title contents

  

  useEffect(() => {
    
    
    console.log('111');

    
    const getMemberInfo = async () => {

      const docRef = doc( firestore, "board", params.idx );
      const docSnap = await getDoc(docRef);

      if( docSnap.exists() ){
        console.log("Document data : ", docSnap.data() );
        //getRows.push( docSnap.data() );
        //setResult( docSnap.data() );      
        let callData = docSnap.data();

        setPass( callData.pass );
        setWriter( callData.writer );
        setTitle( callData.title );
        setContents( callData.contents );
        //console.log('777777');

      
      }else{
        console.log("No such document!");
      }

    };
       getMemberInfo();

  }, []);


  return(<>
    
    <header>
        <h2>게시판 - 수정</h2>
      </header>
      <nav>
        <Link to="/list">목록</Link>
      </nav>
      <article>
        <form onSubmit={ (e) => {

          e.preventDefault();


          let collection = e.target.collection.value;
          let id =  e.target.id.value;          
          let pass = e.target.pass.value;
          let writer = e.target.writer.value;
          let title = e.target.title.value;
          let contents = e.target.contents.value;

          if( confirm("수정하시겠습니까") ){
          //pass writer title contents          

          console.log( collection, id, pass, writer, title, contents );

          boardEdit( collection, id, pass, writer, title, contents );

          }else{
            console.log('5555');
            
            let path = "/edit/"+id;
            console.log(path);
            
            navigate(path);
            //navigate("/edit/"+id);
            //navigate("/list");
            
          }

          //navigate("/edit/"+id);

        }}>
          <table id="boardTable">
            <tbody>
              <tr>
                <td>컬렉션(테이블)</td>
                <td><input type="text" name="collection" value="board" readOnly /></td>
              </tr>
              <tr>
                <td>아이디</td>
                <td><input type="text" name="id" value={params.idx}  readOnly/></td>
              </tr>                 
              <tr>
                <td>비밀번호</td>
                <td><input type="text" name="pass" value={pass} onChange={ (e) => {
                  setPass( e.target.value );
                }}/></td>
              </tr>
              <tr>
                <th>작성자</th>
                <td><input type="text" name="writer" value={writer} onChange={ (e) => {
                  setWriter( e.target.value );
                }} /></td>
              </tr>
              <tr>
                <th>제목</th>
                <td><input type="text" name="title" value={title} onChange={ (e) => {
                  setTitle( e.target.value );
                }}/></td>
              </tr>
              <tr>
                <th>내용</th>
                <td><textarea name="contents" className="contWrap" cols="22" rows="3" value={contents} onChange={ (e) => {
                  setContents( e.target.value );
                }}></textarea></td>
              </tr>
            </tbody>
          </table>
            <input type="submit" value="수정"/>
        </form>
        </article> 

  </>);


}

export default edit;
