import { NavLink, useNavigate } from "react-router-dom";
import { realtime } from '../firestoreConfig';
import { ref, set } from 'firebase/database';
import { getDatabase, child, get, push, update, remove } from 'firebase/database';
import Navi from './Navi';
import { useState } from 'react';
import '../login.css';
import loginLogo from '../images/login_logo.gif';


function ChatLogin(){

  let navigate =  useNavigate();

  const [ result , setResult ] = useState([]);
  const [ str, setStr ] = useState('');

  //데이터 읽기  
  function readMemberData( userId, userPw ){
    //데이터베이스 객체 얻어오기
    const dbRef = ref( getDatabase() );
    //console.log('111'+ dbRef );
    //노드에 등록된 아이디가 있는지 확인한 후 데이터를 가져온다.
    get( child( dbRef, `member/${userId}`)).then( (snapshot) => {
            
      if( snapshot.exists() ){
        
        let member = snapshot.val();
        
        if( member.id == userId ){

          if( member.pw == userPw ){
            alert("로그인 성공");
            navigate("/chat");
              
           //sessionStorage.getItem("id2");            
           sessionStorage.setItem("id2", userId);
            
          }else{
            setStr("패스워드가 다릅니다.");
          }
        }else{
          setStr("아이디가 다릅니다.");
        }

        //데이터가 존재하는 경우 콘솔에 출력한다.
        //console.log( snapshot.val() );
        //conso
        //setResult( snapshot.val() );
      
      }else{
        console.log("No data available");
        setStr("없는 아이디 입니다.");
      }

    })
    .catch( ( error ) => {
      console.error( error );
    });
  }



  return(<>
    <Navi></Navi>
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

        readMemberData( id, pw );

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
            <span><center><img src={loginLogo} style={{ width: "150px" }}></img><span style={{ color: 'blue', fontSize: '24px' }}>채팅창 로그인</span></center></span>
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
                       <NavLink to="/crud">채팅등록창</NavLink><span style={{ color:"blue" }}>{str}</span>
               </td>
            </tr>
            </tbody>
        </table>
        </fieldset>
    </form>

  </>);
}

export default ChatLogin;
