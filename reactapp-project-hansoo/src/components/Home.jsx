import { Link, useNavigate, useParams } from "react-router-dom"; 
import { useEffect, useState } from "react";
//import {firestore} from './firestoreConfig';
import { firestore } from '../firestoreConfig';
import { collection, deleteDoc, doc, setDoc, getDoc, getDocs, query, where } from 'firebase/firestore';
//import '../memberList.css';
import loginLogo from '../images/login_logo.gif';
import bgImage from '../images/bg.jpg';
import bgImage3 from '../images/bg3.jpg';
import '../modalWrite.css';

//3개의 매개변수는 순서대로 쿠키명, 쿠키값, 유효시간(날짜단위)
var setCookie = function ( name, value, exp ){
    //유효기간설정을 위해 date객체생성
    var date = new Date();
    console.log("1970-01-01부터 지금까지의 초 (타임스탬프)", date.getTime() );

    //타임스탬프에 매개변수로 전달된 exp(날짜단위) 와 연산하여 유효기간을 설정
    date.setTime( date.getTime() + exp * 24 * 60 * 60 * 1000 );

    //쿠키생성 : 쿠키=쿠키값; 유효기간=xx; 적용할 경로=xx;
    document.cookie = name + "=" + value + "; expires = " + date.toUTCString() + ";path=/";
    console.log( name + "=" + value + "; expires = " + date.toUTCString() + ";path=/" );

};

//쿠키 삭제하기 : 과거의 시간으로 설정하면 삭제된다.
function deleteCookie( ){
    //var cName = document.getElementById("cName").value;
    //alert("5555");

    var id = document.getElementById("id").value;
    var value = document.getElementById("svalue").value;

    //var svalue = document.getElementById("svalue").value;

    console.log( id +" : "+ value);
    //console.log( svalue );
    // 유효기간을 -1, 즉 어제날짜로 설정한다.
    setCookie( id, value, -1);
    alert("쿠키가 삭제 되었습니다.");
    location.reload();

}


var getCookie = function ( name ){
    //1차 split으로 배열 생성
    var values = document.cookie.split(";");

    //항목의 객수만큼 반복
    for( var i = 0; i < values.length;  i++ ){

        //2차 split으로 쿠키명과 값을 분리
        var unit = values[i].trim();
        var value = unit.split("=");

        //매개변수로 전달된 쿠키명과 비교
        if( value[0] == name ){
            //해당 쿠키값을 반환한다.
            return unescape( value[1] );
        }
    }
    return null;
};

 

const Home = () => {

  let navigate = useNavigate();

  /*
  useEffect(() => {
        
    console.log('111');

    const getCookieInfo = async () => {
      
      var id = getCookie('id');
      console.log("홈 아이디 값 : " + id);
      
      if( id == null ){
        navigate("/login");
      }
      
    };
       getCookieInfo();

  }, []);
*/

const [ result , setResult ] = useState([]);   

  useEffect(() => {    
    
    console.log('111~~~~');
       
    const getMemberInfo = async () => {

      let id = getCookie('id');
      console.log("탑네비 아이디 값 ~~: " + id);

      if( id == null ){
        console.log('아이디 값이 없음~~');
        alert("로그인 해 주세요");
        navigate("/login");

      }else if( id !== null ){
        const docRef = doc( firestore, "members2", id );
       const docSnap = await getDoc(docRef);

        if( docSnap.exists() ){
          console.log('2222~~~');
            console.log("Document data : ", docSnap.data() );
            //getRows.push( docSnap.data() );
            setResult( docSnap.data() );
        
        
        }else{
          console.log("No such document!");
        }     
    };
  }

       getMemberInfo();

  }, []);

let id = result.id;
  
  return(<>

      {/* ../images/login_logo.gif 
          bg.jpg
          ../images/login_logo.gif 
      */}
    <input type="hidden" id="id" value="id" />
    <input type="hidden" id="svalue" value={ id } />
    {/* <img src={bgImage}></img> */}
    <div style={{
      
          backgroundImage: `url('${bgImage3}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          //height: '100vh'
  }} className="form-container">
     

    {/* <input type="text" name="svalue" value={id} readOnly/> */}
    <h2>React 에플리 케이션 제작하기</h2>    
    {/* <h2>{result.name+"님 환영합니다."}<button onClick={ deleteCookie }>로그아웃</button></h2> */}

    <table border="1" className="input-table">
      <tbody>
        <tr>          
          <th>{result.name+"님 환영합니다."}</th>
          <td style={{ textAlign: "left" }}><button onClick={ deleteCookie } >로그아웃</button> </td>
        </tr>
        <tr>          
          <th>주소</th>
          <td style={{ textAlign: "left" }}>{ result.addr1 + result.addr2 }</td>
        </tr>
        <tr>
          <th>이메일</th>
          <td style={{ textAlign: "left" }}>{ result.email1 + "@" + result.email2 }</td>
        </tr>
        <tr>
          <th>전화번호</th>
          <td style={{ textAlign: "left" }}>{ result.phone1 + "-" + result.phone2 + "-" + result.phone3 }</td>
        </tr>
        </tbody>
    </table>
  </div>   

  </>);
}

export default Home;