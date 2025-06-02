import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
//import {firestore} from './firestoreConfig';
import { firestore } from '../../firestoreConfig';
import { collection, deleteDoc, doc, setDoc, getDoc, getDocs, query, where } from 'firebase/firestore';
import '../../member.css';

function zipcode(){
    //alert("111");

    var url = './popup';
    var name = "popup01";
    var option = "width = 500, height = 500, top = 100, left = 200, location = no"
    window.open(url, name, option);

//    new DocumentFragment.Postcode({
//        oncomplete:function(data){      
      

  //      }
  //  }).open();

}


function postOpen(){
    
    new window.daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 
            // 작성하는 부분입니다.
            // 예제를 참고하여 다양한 활용법을 확인해 보세요.
            console.log(data.zonecode, data.address);
            var f = document.myform;
            f.zipcode.value = data.zonecode;
            f.addr1.value = data.address;
            f.addr2.focus();
        }
    }).open();
}

function telKeyup1(e) {
  const f = document.myform;
  const key = e.key;

  // 백스페이스나 방향키는 무시
  if (key === 'Backspace' || key === 'ArrowLeft' || key === 'ArrowRight') return;

  if (f.phone1.value.length === f.phone1.maxLength) {
    f.phone2.focus();
  }
}

function telKeyup2(e) {
  const f = document.myform;
  const key = e.key;

  // 백스페이스나 방향키는 무시
  if (key === 'Backspace' || key === 'ArrowLeft' || key === 'ArrowRight') return;

  if (f.phone2.value.length === f.phone2.maxLength) {
    f.phone3.focus();
  }
}

/*
function telKeyup1(){
    var f = document.myform;
    
    if( f.phone1.value.length == 3 && f.phone1.value.length ==  f.phone1.maxLength ){
        console.log("들어온다.");
        f.phone2.focus();                
    }
}


function telKeyup2(){
    //alert("키실행");
    console.log("키실행");
    var f = document.myform;
    var check1 = true;
    var check2 = true;

    if( f.phone1.value.length == 3 && f.phone1.value.length ==  f.phone1.maxLength ){
        console.log("들어온다.");
        f.phone2.focus();        
        //check1 = false;        
    }

    if( f.phone2.value.length == 4  && f.phone2.value.length <=  f.phone2.maxLength){
        console.log("2번째 들어온다.");
        f.phone3.focus();        
        //check2 = false;
    }
}
*/

function moveNext(current, nextName) {
  if (current.value.length >= current.maxLength) {
    document.myform[nextName].focus();
  }
}

//등록하기
const membersInsert = async ( p_collection, p_id, p_pw, p_name, p_email1, p_email2, p_zipcode, p_addr1, 
    p_addr2, p_phone1, p_phone2, p_phone3  ) =>{
 

  console.log("firestore = " + firestore);

  console.log('11111');

  await setDoc( doc( firestore, p_collection, p_id), {
    id: p_id,
    pw: p_pw,
    name: p_name,
    email1: p_email1,
    email2: p_email2,
    zipcode: p_zipcode,
    addr1:p_addr1,
    addr2: p_addr2,
    phone1: p_phone1,
    phone2: p_phone2,
    phone3: p_phone3,
  })

  
  console.log("입력성공");
}



//let check = false;

function MemberInsert(){  
    

    const [ str, setStr ] = useState('');        
    let navigate = useNavigate();    
    const [ check, setCheck ] = useState(false);
    const [ id2, setId2 ] = useState("");

    //아이디 체크1
    function idCheck(){
    //var id = document.getElementById("id");

        var f = document.myform;

        console.log("아이디 : " + f.id.value );
        var id2 = f.id.value;     

        if( id2 == '' ){
            alert("아이디를 입력해주세요");
            f.id.focus();
            return false;
        }

        getLoginCheck(id2);
   }

    //아이디 체크2
    const getLoginCheck = async ( id ) => {        

        var f = document.myform;
        var id2 = f.id.value;

        /*
        var f = document.myform;
        var id2 = f.id.value;
        temp = id2;

        if( temp != id ){
            console.log();
        }
        */

        const docRef = doc( firestore, "members2", id );
        const doSnap = await getDoc( docRef );
        
        if( doSnap.exists() ){
            setStr("이미 사용중인 아이디 입니다.");            
            setCheck(false);                       
            return false;

        }else{
            setStr("사용가능한 아이디 입니다.");
            setId2(id2);
            setCheck(true);
            return false;

        }      
  }


    return(<>

        {/* style={{ align: 'center'}} */}
    <h2 align="center">회원가입</h2>
        <form name="myform" onSubmit={ (e) => {

           e.preventDefault(); // 기본 폼 제출 막기

            var f = e.target;
            
            var collection = f.collection.value;
            var id = f.id.value;
            var pw = f.pw.value;
            var re_pw = f.re_pw.value;
            var name = f.name.value;
            var email1 = f.email1.value;
            var email2 = f.email2.value;
            var zipcode = f.zipcode.value;
            var addr1 = f.addr1.value;
            var addr2 = f.addr2.value;
            var phone1 = f.phone1.value;
            var phone2 = f.phone2.value;
            var phone3 = f.phone3.value;

            console.log( collection + " : " + id + " : " + pw + " : " + re_pw + " : " + name + " : " + email1 + " : " + 
                email2 + " : " + zipcode + " : " + addr1 + " : " + addr2 + " : " + phone1 + " : " + phone2 + " : " + 
                phone3    );

            if (id == '') {
                alert("아이디를 입력해주세요");
                f.id.focus();
                return false;
            }

            if (pw == '') {
                alert("패스워드를 입력해주세요");
                f.pw.focus();
                return false;
            }

            if (re_pw == '') {
                alert("패스워드 확인을 입력해주세요");
                f.re_pw.focus();
                return false;
            }

            if (pw !== re_pw) {
                alert("비밀번호가 같지 않습니다. 다시 확인해 주세요");
                f.pw.focus();
                return false;
            }

            if (name == '') {
                alert("이름을 입력해주세요");
                f.name.focus();
                return false;
            }

            if (email1 == '') {
                alert("이메일을 입력해 주세요");
                f.email1.focus();
                return false;
            }

            if (email2 == '') {
                alert("이메일 도메인을 입력해주세요");
                f.email2.focus();
                return false;
            }

            if (zipcode == '') {
                alert("우편번호를 입력해주세요");
                f.zipcode.focus();
                return false;
            }

            if (addr1 == '') {
                alert("기본 주소를 입력해주세요");
                f.addr1.focus();
                return false;
            }

            if (addr2 == '') {
                alert("상세 주소를 입력해주세요");
                f.addr2.focus();
                return false;
            }

            if (phone1 == '' || phone2 == '' || phone3 == '') {
                alert("전화번호를 모두 입력해주세요");
                if (phone1 == '') f.phone1.focus();
                else if (phone2 == '') f.phone2.focus();
                else f.phone3.focus();
                return false;
            }   

            var f = document.myform;
            var id3 = f.id.value;

            if( check && id2 == id3  ){
                membersInsert( collection, id, pw, name, email1, email2, zipcode, addr1, addr2, phone1, phone2, phone3   );

                navigate('/login');
            }else{
                setStr("아이디 체크를 하셔야 등록이 됩니다.");
            }
            

            /*
            var id = e.target.id.value;
            var pw = e.target.pw.value;
            var re_pw = e.target.re_pw.value;
            var name = e.target.name.value;
            var email1 = e.target.email1.value;
            var email2 = e.target.email2.value;
            var zipcode = e.target.zipcode.value;
            var addr1 = e.target.addr1.value;
            var addr2 = e.target.addr2.value;

            var phone1 = e.target.phone1.value;
            var phone2 = e.target.phone2.value;
            var phone3 = e.target.phone3.value;
            
            var f = document.myform;

            if( id == ''){
                alert("아이디를 입력해주세요");                
                //e.target.id.focus();
                f.id.focus();
                return false;
            }

            if( pw == '' ){
                alert("패스워드를 입력해주세요");
                //e.target.pw.focus();
                f.pw.focus();
                return false;
            }

            if( re_pw == '' ){
                alert("패스워드 확인을 입력해주세요");
                e.target.re_pw.focus();
                return false;
            }

            if( pw == re_pw ){
                alert("비밀번호가 같지 않습니다. 다시 확인해 주세요");
                e.target.pw.focus();
                return false;
            }

            if( name == '' ){
                alert("이름을 입력해주세요");
                e.target.name.focus();
                return;
            }

            if( email1 == '' ){
                alert("이메일을 입력해 주세요");
                e.target.email1.focus();
                return;
            }

            if( email2 == '' ){
                alert("이메일을 입력해주세요");
                e.target.email2.focus();
                return;
            }

            if( zipcode == '' ){
                alert("우편번호를 입력해주세요");
                e.target.zipcode.focus();
                return;
            }

            if( addr1 == '' ){
                alert("주소를 입력해주세요");
                e.target.addr1.focus();
                return;
            }

            if( addr2 == '' ){
                alert("주소를 입력해주세요");
                e.target.addr2.focus();
                return;
            }

            if( phone1 == '' ){
                alert("전화번호를 입력해주세요");
                e.target.phone1.focus();
                return;
            }
            
            if( phone2 == '' ){
                alert("전화번호를 입력해주세요");
                e.target.phone2.focus();
                return;
            }

            if( phone3 == '' ){
                alert("전화번호를 입력해주세요");
                e.target.phone3.focus();
                return;
            }

            */
            



        }}>
            
            <table border="1" cellPadding="10" width="1000"  align="center" style={{
                        margin: '0 auto', // 가운데 정렬 핵심
                        border: '1px solid black',
                        width: '1000px',
                        borderCollapse: 'collapse',
            }}>
                <tbody>
                 <tr>
                    <td className="td1"><span className="point">*&nbsp;</span>멤버즈</td>
                    <td><input type="text" name="collection" value="members2"  readOnly/></td>
                </tr>
                <tr>
                    <td className="td1"><span className="point">*&nbsp;</span>아이디</td>
                    <td>
                        <input type="text" id="id" name="id" size="18" maxLength="15" style={{ width: '200px'}}/>&nbsp;&nbsp;
                        <input type="button"  value="중복확인"  style={{ width: '70px', height: '30px', fontSize: '16px' }} onClick={idCheck}/>
                          <span style={{ color:"blue"}}>&nbsp;&nbsp;{str}</span> 
                    </td>
                </tr>
                <tr>
                    <td className="td1"><span className="point">*&nbsp;</span>비밀번호</td>
                    <td><input type="password" name="pw" size="14"style={{ width: '200px'}} /></td>
                </tr>
                <tr>
                    <td  className="td1"><span className="point">*&nbsp;</span>비밀번호 확인</td>
                    <td>
                        <input type="password" name="re_pw" size="14" style={{ width: '200px'}}/>&nbsp;&nbsp;(확인을 위해 다시 입력해 주세요)
                    </td>
                </tr>
                <tr>
                    <td className="td1"><span className="point">*&nbsp;</span>이름</td>
                    <td>
                        <input type="text" name="name" size="18" style={{ width: '200px'}}/>
                    </td>
                </tr>            
                <tr>
                    <td className="td1"><span className="point">*&nbsp;</span>이메일</td>
                    <td>
                        <input type="text" name="email1" size="16" style={{ width: '200px'}}/>@
                        <input type="text" name="email2" id="email2" size="16" style={{ width: '200px'}}/>
                        <select name="last_email" onChange={ (e) => {
                            
                             const selectedValue = e.target.value;
                            const email = document.getElementById("email2");

                            if (selectedValue === "custom") {
                                email.value = "";
                                email.readOnly = false;
                            } else {
                                email.value = selectedValue;
                                email.readOnly = true; // 선택한 도메인은 수정 못하게
                            }
                            /*
                            var last_email = e.target.last_email.value;
                            e.target.email2.value = last_email;                           

                            var email = document.getElementById("email2");
                            email.value = last_email;
                            */
                        }}>
                            <option value="custom">직접입력</option>
                            <option value="gmail.com" checked>
                                gmail.com
                            </option>
                            <option value="naver.com">
                                naver.com
                            </option>
                            <option value="daum.net">
                                daum.net
                            </option>                        
                        </select>                    
                    </td>
                </tr>
                <tr>
                    <td rowSpan="3" className="td1">주소</td>
                    <td>                    
                        <input type="text" name="zipcode" size="12" style={{ width: '200px'}}/>
                        (우편번호)
                        <input type="button" value="주소찾기"  style={{ width: '70px', height: '30px', fontSize: '16px' }} onClick={postOpen}/>
                    </td>
                </tr>
                <tr>
                    {/*
                    <td></td>
                    */}
                    <td><input type="text" name="addr1" size="100" style={{ width: '600px'}}/></td>
                </tr>
                <tr>
                    
                    {/* 
                    <!--
                    <td></td>
                    -->
                    */}

                    <td>
                        <input type="text" name="addr2" size="90" style={{ width: '600px'}}/>
                        + 나머지 주소
                    </td>                
                </tr>            
                <tr>
                    <td  className="td1"><span className="point">*&nbsp;</span>휴대전화</td>
                    <td>
                        <input type="tel" name="phone1" size="4" maxLength="3" style={{ width: '80px'}} onKeyDown={telKeyup1} />-
                        <input type="tel" name="phone2" size="8" maxLength="4"style={{ width: '100px'}} onKeyDown={telKeyup2} />-
                        <input type="tel" name="phone3" size="8" maxLength="4"style={{ width: '100px'}}/> 
                        &nbsp;&nbsp;&nbsp;                    
                    </td>
                </tr>            
                
                <tr>
                    <td colSpan="2" style={{ textAlign:"center"}}>
                        <input type="submit" value="등록하기"  style={{ width: '70px', height: '30px', fontSize: '16px' }}/>&nbsp;&nbsp;
                        <input type="reset" value="새로쓰기" style={{ width: '70px', height: '30px', fontSize: '16px' }}/>&nbsp;&nbsp;
                        <Link to="/login" style={{
                                          display: 'inline-block',
                                          padding: '8px 16px',
                                          backgroundColor: '#6c757d',  // Bootstrap의 btn-secondary 색
                                          color: 'white',
                                          textDecoration: 'none',
                                          borderRadius: '4px',
                                          fontSize: '14px',
                                          border: 'none'
                                        }}>로그인</Link>
                    </td>
                </tr>
                </tbody>
            </table>
            
        </form>            
    </>);
}

export default MemberInsert;


