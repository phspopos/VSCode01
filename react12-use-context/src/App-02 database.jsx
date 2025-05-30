import { useState } from 'react'

import {firestore} from './firestoreConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';

function App() {

  console.log("firestore", firestore);

  const nowDate = () => {
    let dateObj = new Date();
    var year = dateObj.getFullYear();
    var month = ("0"+(dateObj.getMonth() +1 )).slice(-2);
    var day = ("0"+dateObj.getDate()).slice(-2);
    return year + "-" + month + "-" + day;
  }

  const memberWrite = async ( p_collection, p_id, p_pass, p_name) => {
    await setDoc( doc( firestore, p_collection, p_id),{
      id: p_id,
      pass: p_pass,
      name: p_name,
      regdate: nowDate(),
    });
    console.log("입력성공");
  }

return (<>
  <div className='App'>
    <h2>Firebase - Firestore 연동 App</h2>
    <h3>입력하기</h3>
    <form  onSubmit={ (event) => {
      event.preventDefault();

      let collection = event.target.collection.value;
      let id = event.target.id.value;
      let pass = event.target.pass.value;
      let name = event.target.name.value;

      console.log( collection, id, pass, name );

      if( id === '' ) { alert("아이디를 입력하세요"); return;  }
      if( pass === '' ) { alert("패스워드를 입력하세요"); return;  }
      if( name === '' ) { alert("이름을 입력하세요"); return;  }

      memberWrite( collection, id, pass, name );

      event.target.id.value = '';
      event.target.pass.value = '';
      event.target.name.value = '';

    }}>
      <table className='table table-bordered table-striped'>
        <tr>
          <td>컬렉션(테이블)</td>
          <td><input type='text' name='collection' value="members" /></td>
        </tr>
        <tr>
          <td>아이디</td>
          <td><input type='text' name='id' /></td>
        </tr>
        <tr>
          <td>비밀번호</td>
          <td><input type='text' name='pass' /></td>
        </tr>
        <tr>
          <td>이름</td>
          <td><input type='text' name='name' /></td>
        </tr>
      </table>
      <button type='submit'>입력</button>
    </form>
  </div>
</>)
}

export default App
