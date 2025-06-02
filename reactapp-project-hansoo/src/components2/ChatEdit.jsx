//css파일을 추가하는 경우 src하위에 생성한 후 import해서 적용한다.
//import '../Chat.css';
//import { realtime } from '../realtimeConfig';
//리얼타임 데이터베이스 연결 및 객체 얻어오기
import { realtime } from '../firestoreConfig';
//리얼타임 사용을 위한 함수 임포트
import { onValue, ref, set } from 'firebase/database';
import { getDatabase, child, get, push, update, remove } from 'firebase/database';
//import Navi from './Navi';
//React에 서 제공하는 Hooks
import { useEffect, useRef, useState } from 'react';
//Router에서 제공하는 Hooks
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import '../modalWrite.css';
import Navi from './Navi';


//데이터 수정
  function editUserData( userId, userPass, userName, userNicName, userDate  ){
    //고유키를 생성
    const newPostKey = push( child( ref( realtime ),'tempValue' )).key;
    //수정할 데이터를 객체 형식으로 작성
    const postData = {
      id: userId,
      pw: userPass,
      name: userName,
      nicName: userNicName,
      fireKey: newPostKey,
      date: userDate,
      
    };
    
    //console.log('111');
    //아이디로 지정된 데이터를 찾아서 수정한다.
    const updates = {};
    console.log("포스 데이터 : " + postData );
    updates['/member/'+userId] = postData;
    //console.log('22222');
    //기존 데이터 뒤에 'edit'를 붙여서 전송한다. (수정 버튼에서 확인)
    return update( ref(realtime), updates );        

  }


function ChatEdit(){
  let params = useParams();
  console.log("쳇팅 수정창 idx = " + params.idx);
  const [ result , setResult ] = useState([]);
  //const userId = params.idx;
  //id pw name nicName
  const [ id, setId ] = useState('');
  const [ pw, setPw ] = useState('');
  const [ name, setName ] = useState('');
  const [ nicName, setNicName ] = useState('');
  const [ date, setDate ] = useState('');

  let navigate = useNavigate();


  useEffect ( () => {

    //데이터 읽기  
    function readUserData( userId ){
    //데이터베이스 객체 얻어오기
      const dbRef = ref( getDatabase() );
      //console.log('111'+ dbRef );
      //노드에 등록된 아이디가 있는지 확인한 후 데이터를 가져온다.
      get( child( dbRef, `member/${params.idx}`)).then( (snapshot) => {
              
        if( snapshot.exists() ){
          //데이터가 존재하는 경우 콘솔에 출력한다.
          //console.log( snapshot.val() );
          //conso
          //setResult( snapshot.val() );

          let memberInfo = snapshot.val();

          setId( memberInfo.id );
          setPw( memberInfo.pw );
          setName( memberInfo.name );
          setNicName( memberInfo.nicName );
          setDate( memberInfo.date );

        
        }else{
          console.log("No data available");
        }

      })
      .catch( ( error ) => {
        console.error( error );
      });
    }

    readUserData();

  }, []);

   //데이터 삭제2
  function deleteUserData( userId ){
    //alert("딜리트 아이디 : "+userId);
    //remove 함수를 통해 데이터를 삭제   
    if( confirm("삭제 하시겠습니까?") ){
      remove( ref( realtime, 'member/'+userId ))
      .then( () => {
      console.log("삭제완료");
      })
      .catch( (error) => {
      console.log("삭제실패", error);
      });

      navigate("/listener");
    }  
  }
  

  
  return(<>
    <div className="form-container">
      <Navi />
      <h2>Firebas - Realtime Database App</h2>
      <h3>사용자 수정</h3>
      <form onSubmit={ (e) => {
        e.preventDefault();
        var f = e.target;      
       
        var id = f.id.value;
        var pw = f.pw.value;
        var name = f.name.value;
        var nicName = f.nicName.value;
        var date = f.date.value;

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

        
        console.log( id + " : " + pw + " : " + name + " : " + nicName + " : " + date  );
        
        //writeUserInsert( id, pw, name, nicName, date );

        if( confirm("수정하시겠습니까?")){
          editUserData( id, pw, name, nicName, date );
          navigate( "/chatEdit/"+id );
        }
        

        // f.id.value = '';
        // f.pw.value = '';
        // f.name.value = '';
        // f.nicName.value = '';
        
        //{"/chatEdit/"+ childData.id}

      }}>

        <input type='hidden' name='date' value={date} />
        <table border="1" className="input-table">
          <tbody>
            <tr>
              <th>아이디</th>
              <td><input type='text' name='id' value={id} readOnly/></td>
            </tr>
            <tr>
              <th>패스워드</th>
              <td><input type='text' name='pw' value={pw} onChange={ (e) => {
                setPw(e.target.value);
              }}/> </td>
            </tr>
            <tr>
              <th>이름</th>
              <td><input type='text' name='name' value={name} onChange={ (e) => {
                setName(e.target.value);
              }}/></td>
            </tr>
            <tr>
              <th>닉네임</th>
              <td><input type='text' name='nicName' value={nicName} onChange={ (e) => {
                setNicName(e.target.value);
              }}/></td>
            </tr>            
            <tr>            
              <td colSpan="2">
                <input type='submit' value="수정하기" style={{ width: '100px', height: '50px', fontSize: '16px' }} />&nbsp;&nbsp;
                <input type='button' value="삭제" onClick={() => deleteUserData(id) } style={{ width: '100px', height: '50px', fontSize: '16px' }} />
                {/* onClick={() => insert() */}
              </td>
            </tr>
          </tbody>
        </table>
      </form>       
    </div>
  </>);
}

export default ChatEdit;