import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
//import {firestore} from './firestoreConfig';
import { firestore } from '../firestoreConfig';
import { collection, deleteDoc, doc, setDoc, getDoc, getDocs, query, where } from 'firebase/firestore';
import '../login.css';
import loginLogo from '../images/login_logo.gif';


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

/*
    쿠키읽기 : 쿠키는 ; (세미콜론) 으로 구분되므로 1차 split한후 =(이퀄)로
    2차 split하여 쿠키값을 읽을수 있다.
*/
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

//쿠키를 만들기 위한 함수
function makeCookie(){
    //사용자가 입력한 값을 읽어온다.
    var cName = document.getElementById("cName").value;
    var cValue = document.getElementById("cValue").value;

    //쿠키명, 쿠키값, 유효기간은 1로 설정하여 쿠키를 생성
    setCookie( cName, cValue, 1 );
    alert("쿠키가 생성되었습니다.");
    //웹브라우저를 새로고침한다. F5를 누른것과 동일하다.
    location.reload();
    /* 쿠키가 생성되면 화면의 이동 혹은 새로고침이 되어야 웹브라우저가
    생성된 쿠키를 인식할 수 있다.*/

}

//쿠키값을 읽기위한 함수
function readCookie(){
    //입력상자로부터 읽을 쿠키명을 가져온다.
    var cName = document.getElementById("cName").value;

    // 해당 이름으로 생성된 쿠키를 읽어온다.
    var readValue = getCookie( cName );
    if( readValue == null ){
        alert("해당 이름으로 생성된 쿠키가 없습니다.");
    
    }else{
        alert("쿠키값 : " + readValue );
    }
}

//쿠키 삭제하기 : 과거의 시간으로 설정하면 삭제된다.
function deleteCookie(){
    var cName = document.getElementById("cName").value;

    // 유효기간을 -1, 즉 어제날짜로 설정한다.
    setCookie( cName, cValue, -1);
    alert("쿠키가 삭제 되었습니다.");
    location.reload();

}

////////////////////////////////

function Login(){
    
  const [ showData, setShowData ] = useState([]);
  const [ str, setStr ] = useState('');

  let navigate = useNavigate();  

    
  const getMemberLogin = async ( id, pw) => {
    
    const docRef = doc( firestore, "members2", id );
    const doSnap = await getDoc( docRef );

    if( doSnap.exists() ){
      //setStr("있는 아이디 입니다.");

      let callData = doSnap.data();

      if( callData.id == id ){

        if( callData.pw == pw ){
          alert("로그인성공");
          
          //setCookie( 'popup', 'off', 1 );
          setCookie("id", callData.id, 1 );

          navigate("/");

        }else{
          setStr("패스워드가 다릅니다.");
        }

      }else{
        setStr("없는 아이디 입니다.");
      }

    }else{
      setStr("없는 아이디 입니다.");
      // /check = true;
    }
  }

  return(<>
  
    <form onSubmit={ (e) => {
        e.preventDefault();

        var id = e.target.id.value;
        var pw = e.target.pw.value;

        console.log( id, pw );

        if( id == '' ){
            alert("아이디를 입력해주세요");
            e.target.id.focus();
            return false;
        }

        if( pw == '' ){
            alert("패스워드를 입력해주세요");
            //pw.value.focus();
            e.target.pw.focus();
            return false;
        }

        getMemberLogin( id, pw );

    }}>
        <fieldset style={{ align:"center"}}>
        <table border="0" width="400" align="center" style={{
    margin: '0 auto', // 가운데 정렬 핵심
    border: '1px solid black',
    width: '400px',
    borderCollapse: 'collapse',
    backgroundColor:"white",
  }}>       
            {/* style={{ width: "80px", height: "50px" }}  */}
            <span><center><img src={loginLogo} style={{ width: "150px" }}></img></center></span>
            <caption style={{ color: 'blue', fontSize: '30px' }} ></caption>
            <tbody>
            <tr>
                <td><input type="text" name="id" placeholder="아이디" className="height1"/></td>                
            </tr>
            <tr>
                <td><input type="password" name="pw" placeholder="패스워드" className="height1"/></td>            
            </tr>
            <tr>
                <td>
                    <input type="submit" value="로그인" />&nbsp;&nbsp;{/* <Link to="/memberInsert">회원가입</Link> <a href="/memberInsert">회원가입</a> */}
                       <Link to="/memberInsert">회원가입</Link><span style={{ color:"blue" }}>{str}</span>
               </td>
            </tr>
            </tbody>
        </table>
        </fieldset>
    </form>

  </>);
}

export default Login;