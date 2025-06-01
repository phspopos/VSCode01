import { NavLink } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
//import {firestore} from './firestoreConfig';
import { firestore } from '../firestoreConfig';
import { collection, deleteDoc, doc, setDoc, getDoc, getDocs, query, where } from 'firebase/firestore';
import "../navi.css"


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

//쿠키 삭제하기 : 과거의 시간으로 설정하면 삭제된다.
function deleteCookie(){
    var cName = document.getElementById("cName").value;

    // 유효기간을 -1, 즉 어제날짜로 설정한다.
    setCookie( cName, cValue, -1);
    alert("쿠키가 삭제 되었습니다.");
    location.reload();

}

///////////////////////////////////////////

function TopNavi(props) {

  const [ result , setResult ] = useState([]);   

  useEffect(() => {    
    
    console.log('2222---');
       
    const getMemberInfo = async () => {

      let id = getCookie('id');
      console.log("222--- 아이디 값 ~~: " + id);

      if( id == null ){
        console.log('222--- 아이디 값이 없음~~');

      }else if( id !== null ){
        const docRef = doc( firestore, "members2", id );
       const docSnap = await getDoc(docRef);

        if( docSnap.exists() ){
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

  return (<>
      <nav>
          <NavLink to="/">Home</NavLink>&nbsp;&nbsp;
          <NavLink to="/memberInsert">회원가입</NavLink>&nbsp;&nbsp;
          <NavLink to="/login">로그인</NavLink>&nbsp;&nbsp;
          <NavLink to="/list">게시판</NavLink>&nbsp;&nbsp;
          <NavLink to="/memberList">회원정보리스트</NavLink>&nbsp;&nbsp;
          <NavLink to="/modalWrite">Q&A등록하기</NavLink>&nbsp;&nbsp;
          <NavLink to="/modalList">Q&A목록보기</NavLink>&nbsp;&nbsp;   
          <NavLink to="/crud">chat입력</NavLink>&nbsp;&nbsp;   
          { /*result.name*/ }       
      </nav>
  </>); 
}
export default TopNavi;