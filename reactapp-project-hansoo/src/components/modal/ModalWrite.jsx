import { Link, useNavigate } from "react-router-dom";
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

   const modalBoardInsert = async ( p_collection, p_no, p_id, p_name, p_title, p_contents ) =>{
  
 
   console.log("firestore = " + firestore);
 
   console.log('11111');
 
   await setDoc( doc( firestore, p_collection, p_id), {     
    no: p_no,
    id: p_id,
     name: p_name,     
     title: p_title,
     contents : p_contents,
     date: nowDate(),
   }) 
   
   console.log("입력성공");
 }
  


function ModalWrite() {

  let navigate = useNavigate();

  const [ showData, setShowData ] = useState([]);  
  const [ num, setNum ] = useState(0);
  
  useEffect( () => { 
  
  console.log("firestore = " + firestore);  

  const getCollection = async () => {    
      
      const querySnapshot = await getDocs(collection(firestore, "modalBoard"));

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

  getCollection();

}, []);

    return (<>
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
            <td>아이디</td>
            <td><input type="text" name="id" /></td>
          </tr>
          <tr>
            <td>이름</td>
            <td><input type="text" name="name" /></td>
          </tr>
          <tr>
            <td>타이틀</td>
            <td><input type="text" name="title" /></td>
          </tr>
          <tr>            
            <td>내용</td>
            <td><textarea name="contents" cols="15" rows="10"></textarea></td>
          </tr>
        </tbody>
      </table>
      <div className="button-container">
        <button type="submit">등록</button><button type="reset">취소</button>
      </div>
    </form>
  </div>

 </> );
};

export default ModalWrite;