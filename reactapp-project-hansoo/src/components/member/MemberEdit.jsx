import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
//import {firestore} from './firestoreConfig';
import { firestore } from '../../firestoreConfig';
import { collection, deleteDoc, doc, setDoc, getDoc, getDocs, query, where } from 'firebase/firestore';


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

  console.log("999");
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

const membersEdit = async ( p_collection, p_id, p_pw, p_name, p_email1, p_email2, p_zipcode, p_addr1, 
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



function MemberEdit(){

  let params = useParams();
  console.log("수정폼 idx777 = " + params.idx);

  let navigate = useNavigate();

  const [ result , setResult ] = useState([]);

  const [ pw, setPw ] = useState('');
  const [ name, setName ] = useState('');
  const [ email1, setEmail1 ] = useState('');
  const [ email2, setEmail2 ] = useState('');
  const [ zipcode, setZipcode ] = useState('');
  const [ addr1, setAddr1 ] = useState('');
  const [ addr2, setAddr2 ] = useState('');
  const [ phone1, setPhone1 ] = useState('');
  const [ phone2, setPhone2 ] = useState('');
  const [ phone3, setPhone3 ] = useState('');

  
  //collection, id

  useEffect(() => {
        
    console.log('111');

    const getMemberInfo = async () => {

      const docRef = doc( firestore, "members2", params.idx );
      const docSnap = await getDoc(docRef);

      if( docSnap.exists() ){
        console.log("Document data : ", docSnap.data() );
        //getRows.push( docSnap.data() );
        //setResult( docSnap.data() );      
        let callData = docSnap.data();

        setPw( callData.pw );
        setName( callData.name );
        setEmail1( callData.email1 );
        setEmail2( callData.email2 );
        setZipcode( callData.zipcode );
        setAddr1( callData.addr1 );
        setAddr2( callData.addr2 );
        setPhone1( callData.phone1 );
        setPhone2( callData.phone2 );
        setPhone3( callData.phone3 );        
      
      }else{
        console.log("No such document!");
      }

    };
       getMemberInfo();

  }, []);




  return(<>
  
  <h2 align="center">회원수정</h2>
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
  
              if( confirm("수정하시겠습니까?") ){
                
                membersEdit( collection, id, pw, name, email1, email2, zipcode, addr1, addr2, phone1, phone2, phone3   );                
                navigate('/memberEdit/'+params.idx);

              }
              

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
                          <input type="text" id="id" name="id" size="18" maxLength="15" style={{ width: '200px'}} value={params.idx} readOnly/>&nbsp;&nbsp;                          
                      </td>
                  </tr>
                  <tr>                    
                      <td className="td1"><span className="point">*&nbsp;</span>비밀번호</td>
                      <td><input type="password" name="pw" size="14"style={{ width: '200px'}} value={pw}  onChange={ (e) => {
                           setPw( e.target.value );
                      }} /></td>
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
                          <input type="text" name="name" size="18" style={{ width: '200px'}} value={name} onChange={ (e) => {
                            setName( e.target.value );
                          }}/>
                      </td>
                  </tr>            
                  <tr>
                      <td className="td1"><span className="point">*&nbsp;</span>이메일</td>
                      <td>
                          <input type="text" name="email1" size="16" style={{ width: '200px'}} value={email1} onChange={ (e) => {
                            setEmail1( e.target.value );
                          }}/>@
                          <input type="text" name="email2" id="email2" size="16" style={{ width: '200px'}} value={email2} onChange={ (e) => {
                            setEmail2( e.target.value );
                          }}/>
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
                          <input type="text" name="zipcode" size="12" style={{ width: '200px'}} value={zipcode} onChange={ (e) => {
                            setZipcode( e.target.value );
                          }}/>
                          (우편번호)
                          <input type="button" value="주소찾기"  style={{ width: '70px', height: '30px', fontSize: '16px' }} onClick={postOpen}/>
                      </td>
                  </tr>
                  <tr>
                      {/*
                      <td></td>
                      */}
                      <td><input type="text" name="addr1" size="100" style={{ width: '600px'}} value={addr1} onChange={ (e) => {
                        setAddr1( e.target.value );
                      }}/></td>
                  </tr>
                  <tr>
                      
                      {/* 
                      <!--
                      <td></td>
                      -->
                      */}
  
                      <td>
                          <input type="text" name="addr2" size="90" style={{ width: '600px'}} value={addr2} onChange={ (e) => {
                            setAddr2( e.target.value );
                          }}/>
                          + 나머지 주소
                      </td>                
                  </tr>            
                  <tr>
                      <td  className="td1"><span className="point">*&nbsp;</span>휴대전화</td>
                      <td>
                          <input type="tel" name="phone1" size="4" maxLength="3" style={{ width: '80px'}} value={phone1} onKeyDown={telKeyup1} onChange={ (e) => {
                            setPhone1( e.target.value );
                          }}/>-
                          <input type="tel" name="phone2" size="8" maxLength="4"style={{ width: '100px'}} value={phone2} onKeyDown={telKeyup2} onChange={ (e) => {
                            setPhone2( e.target.value );
                          }}/>-
                          <input type="tel" name="phone3" size="8" maxLength="4"style={{ width: '100px'}} value={phone3} onChange={ (e) => {
                            setPhone3( e.target.value );
                          }}/> 
                          &nbsp;&nbsp;&nbsp;                    
                      </td>
                  </tr>            
                  
                  <tr>
                      <td colSpan="2" style={{ textAlign:"center"}}>
                          <input type="submit" value="수정하기"  style={{ width: '70px', height: '30px', fontSize: '16px' }}/>&nbsp;&nbsp;
                          {/* <input type="reset" value="새로쓰기" style={{ width: '70px', height: '30px', fontSize: '16px' }}/>&nbsp;&nbsp; */}
                          &nbsp;&nbsp;<Link to="/login" style={{
                                          display: 'inline-block',
                                          padding: '8px 16px',
                                          backgroundColor: '#6c757d',  // Bootstrap의 btn-secondary 색
                                          color: 'white',
                                          textDecoration: 'none',
                                          borderRadius: '4px',
                                          fontSize: '14px',
                                          border: 'none'
                                        }}>로그인</Link>&nbsp;&nbsp;
                                        
                          <Link to="/memberList" style={{
                                          display: 'inline-block',
                                          padding: '8px 16px',
                                          backgroundColor: '#6c757d',  // Bootstrap의 btn-secondary 색
                                          color: 'white',
                                          textDecoration: 'none',
                                          borderRadius: '4px',
                                          fontSize: '14px',
                                          border: 'none'
                                        }}>목록</Link>&nbsp;&nbsp;
                      </td>
                  </tr>
                  </tbody>
              </table>
              
          </form>            

  </>);

}

export default MemberEdit;