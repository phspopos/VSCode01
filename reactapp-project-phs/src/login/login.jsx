import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
//import {firestore} from './firestoreConfig';
import { firestore } from '../firestoreConfig';
import { collection, deleteDoc, doc, setDoc, getDoc, getDocs, query, where } from 'firebase/firestore';
import '../login.css';
import loginLogo from '../images/login_logo.gif';

function Login(){
    
  return(<>
  
    <form onSubmit={ (e) => {
        e.preventDefault();

        var id = e.target.id.value;
        var pw = e.target.pw.value;

        console.log( id, pw );

        if( id == '' ){
            alert("아이디를 입력해주세요");
            e.target.id.focus();
            return;
        }

        if( pw == '' ){
            alert("패스워드를 입력해주세요");
            //pw.value.focus();
            e.target.pw.focus();
            return;
        }

    }}>
        <fieldset style={{ align:"center"}}>
        <table border="0" width="400" align="center" style={{
    margin: '0 auto', // 가운데 정렬 핵심
    border: '1px solid black',
    width: '400px',
    borderCollapse: 'collapse',
    backgroundColor:"white",
  }}>
            <caption style={{ color: 'blue', fontSize: '30px' }} ><center><img src={loginLogo}></img></center></caption>
            <tr>
                <td><input type="text" name="id" placeholder="아이디" className="height1"/></td>                
            </tr>
            <tr>
                <td><input type="password" name="pw" placeholder="패스워드" className="height1"/></td>            
            </tr>
            <tr>
                <td>
                    <input type="submit" value="로그인" />&nbsp;&nbsp;{/* <Link to="/memberInsert">회원가입</Link> <a href="/memberInsert">회원가입</a> */}
                       <Link to="/memberInsert">회원가입</Link>
               </td>
            </tr>
        </table>
        </fieldset>
    </form>

  </>);
}

export default Login;