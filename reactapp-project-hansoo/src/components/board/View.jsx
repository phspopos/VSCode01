import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
//import {firestore} from './firestoreConfig';
import { firestore } from '../../firestoreConfig';
import { collection, deleteDoc, doc, setDoc, getDoc, getDocs, query, where } from 'firebase/firestore';
//import '../../modalWrite.css';
import '../../modalWrite.css';

function formatDateOrTime(inputDateStr) {
  const inputDate = new Date(inputDateStr);
  const now = new Date();

  console.log( "인푹데이트 : " + inputDate );
  console.log(" 현재날짜 : " + now );
  // 시간 차 계산 (ms)
  const diffMs = now - inputDate;

  console.log("디프런트 값 : " + diffMs );

  const oneDayMs = 24 * 60 * 60 * 1000;

  if (diffMs < oneDayMs) {
    // 하루 안 지났으면 시간만 반환
    //const hours = inputDate.getHours().toString().padStart(2, '0');
    //const minutes = inputDate.getMinutes().toString().padStart(2, '0');
    //return `${hours}:${minutes}`;
    return ("0"+(now.getHours())).slice(-2) + " : " + ("0"+(now.getMinutes())).slice(-2);
  } else {
    // 하루 이상 지났으면 날짜 반환
    var year = now.getFullYear();
    var month = ("0"+(now.getMonth() +1 )).slice(-2);
    var day = ("0"+now.getDate()).slice(-2);
    return year + "-" + month + "-" + day;
  }
}



function View(){

  //const [ showData, setShowData ] = useState([]);
  let memberInfo = [];

  let params = useParams();
  console.log("idx = " + params.idx);

  let navigate = useNavigate();
  
  let getRows = [];
  //let result = [];

  const [ result , setResult ] = useState([]);
  useEffect(() => {
    
    
    console.log('111');

    
    const getMemberInfo = async () => {

      const docRef = doc( firestore, "board", params.idx );
      const docSnap = await getDoc(docRef);

      if( docSnap.exists() ){
        console.log("Document data : ", docSnap.data() );
        //getRows.push( docSnap.data() );
        setResult( docSnap.data() );
      
      
      }else{
        console.log("No such document!");
      }

      /*
      getRows.forEach( (row) =>{

        console.log("111 ="+row.id);
        console.log("2222 ="+row.pass);
      */
        /*
       result = { 
          id : params.idx,
          pass : row.pass,
          writer : row.writer,
          title : row.title,
          contents : row.contents,
        }
          */

        /*
        setResult({
          id: params.idx,
          pass: row.pass,
          writer: row.writer,
          title: row.title,
          contents: row.contents,
        });

        
        console.log( "test = "+ test );
        console.log('title = '+ test.title);
        console.log('contents = '+ test.contents);
      });
      */

      /*
      const docRef = doc( firestore, "board", params.idx );
      const docSnap = await getDoc( docRef);
    
      if( docSnap.exists() ){
        console.log('222');
        */
        //getRows.push( docSnap.data() );
        
        //memberInfo = docSnap.data();

        //getRows = docSnap.data();

        //console.log('getRows = ' + getRows);

        // memberInfo.map( (row) =>{
        //   getRows.push(row);
        
        //   return getRows;
        // });

        //console.log(" 맴버인포 : "+memberInfo);

      //}
    };
       getMemberInfo();

  }, []);


  return(<>
    
    <div className="form-container">
    <header>
      <h2>게시펀-읽기</h2>
    </header>
    <nav>
      <Link to="/list">목록</Link>&nbsp;&nbsp;
      <Link to={"/edit/"+params.idx} >수정</Link>&nbsp;&nbsp;
      {/*<Link to={"/delete/"+params.idx}>삭제</Link>*/}
      <a href="/" onClick={  async (e) => {
        e.preventDefault();

        if( confirm("삭제하시겠습니까") ){
          await deleteDoc( doc( firestore, "board", params.idx ));
          navigate("/list");
        
        }else{
          //navigate("/eidt/"+params.idx);
          //navigate(-1);
        }

      }}>삭제</a>

      {/* <a href="/">목록</a>&nbsp;
      <a href="/">수정</a>&nbsp;
      <a href="/">삭제</a>&nbsp; */}
    </nav>
    <article>
      <table id="boardTable" className="input-table">
        <colgroup>
          <col width="30%"/>
          <col width="*" />          
        </colgroup>
        <tbody>
          {/* memberWrite( collection, id, pass, writer, title, contents ); */}
          <tr>
            <th>아이디</th>
            <td>{params.idx}</td>
          </tr>
          <tr>
            <th>패스워드</th>
            <td>{result.pass}</td>
          </tr>
          <tr>
            <th>작성자</th>
            <td>{result.writer}</td>
          </tr>
          <tr>
            <th>제목</th>
            <td>{result.title}</td>
          </tr>
          <tr>
            <th>내용</th>
            <td className="contWrap">{result.contents}</td>
          </tr>
           <tr>
            <th>날짜</th>
            <td>{ formatDateOrTime( result.date ) }</td>
          </tr>         
        </tbody>
      </table>
    </article>
</div>

  </>);


}

export default View;
