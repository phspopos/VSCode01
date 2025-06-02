import { Link, useNavigate, useParams } from "react-router-dom"; 
import { useEffect, useState } from "react";
//import {firestore} from './firestoreConfig';
import { firestore } from '../../firestoreConfig';
import { collection, deleteDoc, doc, setDoc, getDoc, getDocs, query, where } from 'firebase/firestore';
import '../../member.css';



function MemberView(){

  let params = useParams();
  console.log("idx = " + params.idx);
  let navigate = useNavigate();

   const [ result , setResult ] = useState([]);   
  
   useEffect(() => {
        
    console.log('111');

    const getMemberInfo = async () => {

      const docRef = doc( firestore, "members2", params.idx );
      const docSnap = await getDoc(docRef);

      if( docSnap.exists() ){
        console.log("Document data : ", docSnap.data() );
        //getRows.push( docSnap.data() );
        setResult( docSnap.data() );      
      
      }else{
        console.log("No such document!");
      }

    };
       getMemberInfo();

  }, []);



  return(<>
    <nav>
      <Link to="/memberList">목록</Link>&nbsp;&nbsp;
      <Link to={"/memberEdit/"+params.idx} >수정</Link>&nbsp;&nbsp;
      {/* <Link to={"/delete/"+params.idx}>삭제</Link> */}
      
      <a href="/" onClick={  async (e) => {
        e.preventDefault();

        if( confirm("회원 탈퇴 하시겠습니까") ){
          await deleteDoc( doc( firestore, "members2", params.idx ));
          navigate("/memberList");
        
        }else{
          //navigate("/eidt/"+params.idx);
          //navigate(-1);
        }

      }}>삭제</a>

    </nav>

    <h2 align="center">회원상세보기</h2>
            <form name="myform" onSubmit={ (e) => {
              e.preventDefault();



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
                        <td><input type="text" name="collection" value="members2" readOnly/></td>
                    </tr>
                    <tr>
                        <td className="td1"><span className="point">*&nbsp;</span>아이디</td>
                        <td>
                            
                            {result.id}
                            
                        </td>
                    </tr>
                    <tr>
                        <td className="td1"><span className="point">*&nbsp;</span>비밀번호</td>
                        <td>{result.pw}</td>
                    </tr>                    
                    <tr>
                        <td className="td1"><span className="point">*&nbsp;</span>이름</td>
                        <td>
                            {result.name}
                        </td>
                    </tr>            
                    <tr>
                        <td className="td1"><span className="point">*&nbsp;</span>이메일</td>
                        <td>
                            { result.email1 +"@"+ result.email2 }
                        </td>
                    </tr>
                    <tr>
                        <td rowSpan="3" className="td1">주소</td>
                        <td>                    
                            {result.zipcode}
                        </td>
                    </tr>
                    <tr>
                        {/*
                        <td></td>
                        */}
                        <td>{result.addr1}</td>
                    </tr>
                    <tr>
                        
                        {/* 
                        <!--
                        <td></td>
                        -->
                        */}
    
                        <td>
                            {result.addr2}

                        </td>                
                    </tr>            
                    <tr>
                        <td  className="td1"><span className="point">*&nbsp;</span>휴대전화</td>
                        <td>
                            {result.phone1+"-"+result.phone2+"-"+ result.phone3 }
                        </td>
                    </tr>            
                    
                    <tr>
                        <td colSpan="2" style={{ textAlign:"center"}}>
                            {/* <input type="submit" value="수정하기"  style={{ width: '70px', height: '30px', fontSize: '16px' }}/>&nbsp;&nbsp; */}
                            
                            <Link to="/memberList" style={{
                                          display: 'inline-block',
                                          padding: '8px 16px',
                                          backgroundColor: '#6c757d',  // Bootstrap의 btn-secondary 색
                                          color: 'white',
                                          textDecoration: 'none',
                                          borderRadius: '4px',
                                          fontSize: '14px',
                                          border: 'none'
                                        }}>회원리스트</Link>
                        </td>
                    </tr>
                    </tbody>
                </table>
                
            </form>            
    
  </>);

}

export default MemberView;