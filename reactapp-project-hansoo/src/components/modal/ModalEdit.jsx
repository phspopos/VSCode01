import { NavLink } from "react-router-dom";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
//import {firestore} from './firestoreConfig';
import { firestore } from '../../firestoreConfig';
import { collection, deleteDoc, doc, setDoc, getDoc, getDocs, query, where } from 'firebase/firestore';
import '../../modalWrite.css';


//오늘의 날짜를 만들기 위한 함수
  const nowDate = () => {
    let dateObj = new Date();
    var year = dateObj.getFullYear();
    var month = ("0"+(dateObj.getMonth() +1 )).slice(-2);
    var day = ("0"+dateObj.getDate()).slice(-2);
    var hours = dateObj.getHours();
    var min =dateObj.getMinutes();
    console.log( dateObj.getHours() +" : "+ dateObj.getMinutes() + " : " + dateObj.getSeconds() );
    //return year + "-" + month + "-" + day + hours + ":" + min;
    return year + "-" + month + "-" + day;

  }

 
   const modalBoardEdit = async ( p_collection, p_no, p_id, p_name, p_title, p_contents, p_date ) =>{
  
 
   console.log("firestore = " + firestore);
 
   console.log('11111');
 
   await setDoc( doc( firestore, p_collection, p_id), {     
    no: p_no,
    id: p_id,
     name: p_name,     
     title: p_title,
     contents : p_contents,
     date: p_date,
   }) 
   
   console.log("수정성공");
 }
  


function ModalEdit() {

  let params = useParams();
  console.log("모달수정-- idx = " + params.idx);
  console.log("모달수정-- pnum = " + params.pnum);

  let navigate = useNavigate();

  const [ showData, setShowData ] = useState([]);  
  const [ num, setNum ] = useState(0);  
  
    const [ no, setNo ] = useState('');
    const [ id, setId ] = useState('');
    const [ name, setName ] = useState('');
    const [ title, setITitle ] = useState('');
    const [ contents, setContents ] = useState('');
    const [ date, setDate ] = useState('');

  
  useEffect( () => { 
  
  console.log("firestore = " + firestore);  


  const getModalInfo = async () => {

      const docRef = doc( firestore, "modalBoard", params.idx );
      const docSnap = await getDoc(docRef);

      if( docSnap.exists() ){
        console.log("Document data : ", docSnap.data() );
        //getRows.push( docSnap.data() );
        //setResult( docSnap.data() );      
        let callData = docSnap.data();
        setNo( callData.no );
        setId( callData.id );
        setName( callData.name );
        setITitle( callData.title );
        setContents( callData.contents );
        setDate( callData.date );
        
        //setPass( callData.pass );
        //setWriter( callData.writer );
        //setTitle( callData.title );
        //setContents( callData.contents );
        //setDate( formatDateOrTime(callData.date) );
        //setDate(formatDateOrTime(date))
        //console.log('777777');
      
      }else{
        console.log("No such document!");
      }
    };

    getModalInfo();

}, []);

    return (<>
    
    <div className="form-container">
    <h2>Q&A수정</h2>
    <form id="registerForm" onSubmit={ (e) => {
        e.preventDefault();

        var f = e.target;

        let collection = f.collection.value;
        let id = f.id.value;
        let name = f.name.value;
        let title = f.title.value;
        let contents = f.contents.value;
        

        console.log( collection+"  :  "+ id + "  :  " + name + " : " +title + " : " + contents + " : " + date );

        if( id == '' ){
          alert("아이디를 입력해주세요");
          f.id.focus();
          return false;
        }

        if( name == '' ){
          alert("이름을 입력해주세요");
          f.name.focus();
          return false;
        }

        if( title == '' ){
          alert("제목을 입력해주세요");
          f.title.focus();
          return false;
        }

        if( contents == '' ){
          alert("내용을 입력해주세요");
          f.contents.focus();
          return false;
        }

        //let no = num;
        if( confirm("수정하시겠습니까?") ){

          modalBoardEdit( collection, no, id, name, title, contents, date );
          navigate("/modalEdit/"+params.idx+"/"+params.pnum );

        }else{
          console.log("수정안함"); 
        }

        
        //modalBoardInsert( collection, no, id, name, title, contents );
        //modalBoardInsert( collection, id, name, contents );
        //navigate("/modalList");

        
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
            <td><input type="text" name="collection" value="modalBoard" readOnly/></td>
          </tr>          
          <tr>
            <td>아이디</td>
            <td><input type="text" name="id" value={id} readOnly/></td>
          </tr>
          <tr>
            <td>이름</td>
            <td><input type="text" name="name" value={name}  onChange={ (e) => {
              setName( e.target.value );
            }}/></td>
          </tr>
          <tr>
            <td>타이틀</td>
            <td><input type="text" name="title" value={title} onChange={ (e) => {
              setITitle( e.target.value );
            }} /></td>
          </tr>
          <tr>            
            <td>내용</td>
            <td><textarea className="contWrap" name="contents" cols="15" rows="10" value={contents} onChange={ (e) => {
              setContents( e.target.value );              
            }}></textarea></td>
          </tr>
        </tbody>
      </table>
      <div className="button-container">
        <button type="submit">수정하기버튼</button><NavLink to="/modalList" style={{
                                          display: 'inline-block',
                                          padding: '8px 16px',
                                          backgroundColor: '#6c757d',  // Bootstrap의 btn-secondary 색
                                          color: 'white',
                                          textDecoration: 'none',
                                          borderRadius: '4px',
                                          fontSize: '14px',
                                          border: 'none'
                                        }}>Q&A목록보기</NavLink>&nbsp;&nbsp;   
      </div>
    </form>
  </div>

 </> );
};

export default ModalEdit;