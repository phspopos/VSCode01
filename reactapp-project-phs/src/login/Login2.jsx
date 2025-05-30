import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
//import {firestore} from './firestoreConfig';
import { firestore } from '../firestoreConfig';
import { collection, deleteDoc, doc, setDoc, getDoc, getDocs, query, where } from 'firebase/firestore';




let check = false;

function Login(){

  const [ showData, setShowData ] = useState([]);
  const [ str, setStr ] = useState('');
  let navigate = useNavigate();  

  const getBoard = async ( id, pass) => {
    
    const docRef = doc( firestore, "board", id);
    const doSnap = await getDoc( docRef );

    if( doSnap.exists() ){
      //setStr("있는 아이디 입니다.");

      let callData = doSnap.data();

      if( callData.id == id ){

        if( callData.pass == pass ){
          alert("로그인성공");
          navigate("/list");

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
    <h2>로그인 페이지</h2>

    <form onSubmit={ (e) => {
      e.preventDefault();

      let id = e.target.id.value;
      let pass = e.target.pass.value;

      console.log( id + " : " + pass );

      getBoard( id, pass );

      /*if( check ){
        getBoard( id, pass );
      }*/


    }}>
      <table>
        <tr>
          <td>이이디</td>
          <td><input type="text" name="id" /></td>
        </tr>
        <tr>
          <td>패스워드</td>
          <td><input type="text" name="pass" /></td>
        </tr>
        <tr>
          <td>
            <input type="submit" value="로그인" />
          </td>
          <td><span>{str}</span></td>        
        </tr>
      </table>
    </form>

  </>)

}

export default Login;