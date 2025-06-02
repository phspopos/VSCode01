import { realtime } from '../firestoreConfig';
import { ref, set } from 'firebase/database';
import { getDatabase, child, get, push, update, remove } from 'firebase/database';
import Navi from './Navi';
import { useState } from 'react';
import '../modalWrite.css';
import { NavLink } from 'react-router-dom';

function RealtimeCRUD() {
  //database 연결확인
  console.log("realtime", realtime);


  //오늘의 날짜를 만들기 위한 함수
  const nowDate = () => {

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let dateObj = new Date();
    var year = dateObj.getFullYear();
    var month = months[dateObj.getMonth()];
    var day = ("0"+dateObj.getDate()).slice(-2);
    var hours = ("0"+dateObj.getHours() ).slice(-2);
    var min = ("0"+dateObj.getMinutes()).slice(-2);    
    //console.log( dateObj.getHours() +" : "+ dateObj.getMinutes() + " : " + dateObj.getSeconds() );
    let ampm = hours >= 12 ? 'PM' : 'AM';
    
    console.log( day + month + hours + ":" + min + ampm );
    //return year + "-" + month + "-" + day;
    return day +" "+ month +" "+ hours + " : " + min +" "+ ampm;

  }

  //테스트를 위해 만듬
  const [ result , setResult ] = useState([]);
  //데이터쓰기
  /*
    set() : 기본 쓰기 작업에 사용. 지정된 참조에 데이터를 저장하고 해당
    경로의 기존 데이터를 모두 변경할 수 있다.
  */
  function writeUserData( userId, userName, userPass){
    //새로운 게시물 등록을 위한 key값을 생성한다. -o3ygh.. 이런식
    const newPostKey = push( child( ref(realtime), 'tempValue')).key;
    /*
      최상위 노드를 users로 하고 하위는 사용자가 입력한 ID를 데이터로 구분하여
      입력한다. 만약 ID가 동일하면 덮어쓰기 (수정)된다.
    */ 

    set( ref( realtime, 'users/'+userId ), {
      name: userName,
      pass: userPass,
      fireKey : newPostKey,
      date : nowDate(),
    }); 
    console.log('입력성공');
  }

  
  //데이터 읽기  
  function readUserData( userId ){
    //데이터베이스 객체 얻어오기
    const dbRef = ref( getDatabase() );
    //console.log('111'+ dbRef );
    //노드에 등록된 아이디가 있는지 확인한 후 데이터를 가져온다.
    get( child( dbRef, `users/${userId}`)).then( (snapshot) => {
            
      if( snapshot.exists() ){
        //데이터가 존재하는 경우 콘솔에 출력한다.
        console.log( snapshot.val() );
        //conso
        setResult( snapshot.val() );
      
      }else{
        console.log("No data available");
      }

    })
    .catch( ( error ) => {
      console.error( error );
    });
  }

  //데이터 수정
  function editUserData( userId, userName, userPass ){
    //고유키를 생성
    const newPostKey = push( child( ref( realtime ),'tempValue' )).key;
    //수정할 데이터를 객체 형식으로 작성
    const postData = {
      name: userName,
      pass: userPass,
      fireKey: newPostKey
    };

    console.log('111');
    //아이디로 지정된 데이터를 찾아서 수정한다.
    const updates = {};
    console.log("포스 데이터 : " + postData );
    updates['/users/'+userId] = postData;
    
    //기존 데이터 뒤에 'edit'를 붙여서 전송한다. (수정 버튼에서 확인)
    return update( ref(realtime), updates );    

  }

  //데이터 삭제1 
  function deleteUserData1(userId){
    //기존 데이터를 null값으로 대체해서 삭제
    const deletes = {};
    deletes['/users/'+userId] = null;
    return update( ref( realtime ), deletes );
  }

  //데이터 삭제2
  function deleteUserData2( userId ){
    //remove 함수를 통해 데이터를 삭제
    remove( ref( realtime, 'users/'+userId ))
    .then( () => {
      console.log("삭제완료");
    })
    .catch( (error) => {
      console.log("삭제실패", error);
    });
  }


  //id, pw, name, nicName ------ 여기서 부터 현재 코딩 ----------------------
  function writeUserInsert( userId, userPass,  userName, userNicName  ){
    //새로운 게시물 등록을 위한 key값을 생성한다. -o3ygh.. 이런식
    const newPostKey = push( child( ref(realtime), 'tempValue')).key;
    /*
      최상위 노드를 users로 하고 하위는 사용자가 입력한 ID를 데이터로 구분하여
      입력한다. 만약 ID가 동일하면 덮어쓰기 (수정)된다.
    */ 

    set( ref( realtime, 'member/'+userId ), {
      id: userId,
      pw: userPass,
      name: userName,
      nicName: userNicName,
      fireKey : newPostKey,
      date : nowDate(),
    }); 
    console.log('입력성공');
  }



  // 입력을 위한 스테이트로 input의스핀버튼을 누를때마다 변경된다.
  const [ addNum, setAddNum ] = useState(0);

  //입력데이터(수정해서 사용하세요.)
  //입력데이터로 사용할 문자열로 스테이트가 변경될때 즉시 적용된다.
  //let adder = "-"+addNum;
  //const id = 'nakja'+adder;
  //const name = "낙자쌤"+adder;
  //const pass = "xyz"+adder;

  return(<>
    <div className="form-container">
      <Navi />
      {/* <h2>Firebas - Realtime Database App</h2> */}
      <h3>사용자 등록</h3>
      <form onSubmit={ (e) => {
        e.preventDefault();
        var f = e.target;      
       
        var id = f.id.value;
        var pw = f.pw.value;
        var name = f.name.value;
        var nicName = f.nicName.value;

        if (id == '') {
         alert("아이디를 입력해주세요");
         f.id.focus();
         return false;
       }

       if( pw == '' ){
        alert("패스워드를 입력해 주세요");
        f.pw.focus();
        return false;
       }

       if( name == '' ){
        alert("이름을 입력해 주세요");
        f.name.focus();
        return false;
       }
      
       if( nicName == '' ){
        alert("별칭을 입력해 주세요");
        f.nicName.focus();
        return false;
       }

        
        console.log( id + ":" + pw + ":" + name + ":" + nicName  );
        
        writeUserInsert( id, pw, name, nicName );

        f.id.value = '';
        f.pw.value = '';
        f.name.value = '';
        f.nicName.value = '';

      }}>
        <table border="1" className="input-table">
          <tbody>
            <tr>
              <th>아이디</th>
              <td><input type='text' name='id' /></td>
            </tr>
            <tr>
              <th>패스워드</th>
              <td><input type='text' name='pw' /></td>
            </tr>
            <tr>
              <th>이름</th>
              <td><input type='text' name='name' /></td>
            </tr>
            <tr>
              <th>닉네임</th>
              <td><input type='text' name='nicName' /></td>
            </tr>            
            <tr>            
              <td colSpan="2">
                <input type='submit' value="사용자등록" style={{ width: '100px', height: '50px', fontSize: '16px' }} />
                <NavLink to="/listener" style={{
                                          display: 'inline-block',
                                          padding: '8px 16px',
                                          backgroundColor: '#6c757d',  // Bootstrap의 btn-secondary 색
                                          color: 'white',
                                          textDecoration: 'none',
                                          borderRadius: '4px',
                                          fontSize: '14px',
                                          border: 'none'
                                        }}>리스트상세보기</NavLink>
              
              </td>
            </tr>
          </tbody>
        </table>
      </form>  
      
      {/* <input type='number' value={addNum} onChange={ (e) => {
        setAddNum( e.target.value );
      }}/>
      <input type='button' value='입력' onClick={ () => {
        writeUserData( id, name, pass );
      }}/>
      <input type='button' value='읽기' onClick={ () => {
        readUserData(id);
      }}/>

      <input type='button' value='수정' onClick={ () =>{
        editUserData( id, name+'edit', pass+"edit");
      }}/>

      <input type="button" value='삭제1' onClick={ () => {
        deleteUserData1(id);
      }} />

      <input type='button' value='삭제2' onClick={ () => {
        deleteUserData2(id);
      }}/>

      <input type='button' value='시간' onClick={ () => {
        nowDate();
      }}/> */}
      <span>{/*result + " :  "+ result.name*/}</span>
    </div>
  </>);

}

export default RealtimeCRUD;
