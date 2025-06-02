import { useEffect, useRef, useState } from "react";
import Navi from "./Navi";
import { useNavigate } from "react-router-dom";
import { realtime } from '../firestoreConfig';
import { ref, set } from 'firebase/database';
import { getDatabase, child, get, push, update, remove } from 'firebase/database';
import '../modalWrite.css';


const ChatStart = () => {

  let navigate =  useNavigate();
  const [ result , setResult ] = useState([]);

  useEffect(() => {

    //데이터 읽기  
    function readMemberData( ){

      //데이터베이스 객체 얻어오기
      const dbRef = ref( getDatabase() );
      //console.log('111'+ dbRef );
      //노드에 등록된 아이디가 있는지 확인한 후 데이터를 가져온다.
      
      var userId = sessionStorage.getItem("id2");
      console.log("챗 아이디 "+ userId);

      if( userId !== null ){

          get( child( dbRef, `member/${userId}`)).then( (snapshot) => {
                
          if( snapshot.exists() ){            
            //let member = snapshot.val();           
            
            setResult( snapshot.val() );
            //sessionStorage.getItem("id2");            
            //sessionStorage.setItem("id2", userId);                            
            
            //데이터가 존재하는 경우 콘솔에 출력한다.
            console.log( snapshot.val() );            
          
          }else{
            console.log("No data available");
            navigate("/chatLogin");          
          
          }
    
        })
        .catch( ( error ) => {
          console.error( error );
        });
      
      }else{
        alert("로그인 해주세요");
        navigate("/chatLogin");
        
        
      }
    
      }

      
    readMemberData();

  }, []);
  
  function removeSession(){
    sessionStorage.removeItem("id2");    
  } 

  
  //input 태그의 DOM 에 접근하기 위해 useRef로 변수선언
  /*
    useRef 훅을 통해 변수를 생성하면 current 라는 key를 가진 객체를 반환한다
    즉 { current : 초기값 } 과 같은 형태가 된다.
  */
  //대화방의 이름(아이디)
  //const refRoom = useRef();
  //접속자의 아이디
  //const refId = useRef();
/*
  open() 함수를 이용해서 채팅창을 팝업으로 오픈한다
  형식] open( 팝업창의 요청 url, 창의이름, 창의속성);
  두번재 인수린 '창의이름'에 이름을 부여하면, 새로운 창을 열었을때
  항상 같은 위치에서 열리게 된다. 즉 새로운 창을  열수없으므로 여기서는
  '창의이름'을 부여하지 않아야 한다.
*/
  const openChatWin = () => {
    //console.log('1111');
    //window.open( `/chat/talk?roomId=${createRoutesFromElements.current.value}&userId=${refId.current.value}`, 'width=500, height=700');
    //window.open('/chat/talk');

    /*
      useRef 를 통해 참조한  input의 DOM을 이용해서 입력값을 얻어온다
      그리고 팝업창을 띄울때 파라미터로 사용한다. 즉 대화창이 팝업으로 
      띄울때 방명과 대화명을 전달해야 한다.
    */
    //window.open(`/chat/talk?roomId=${refRoom.current.value}&userId=${refId.current.value}`, '' , 'width=500, height=700');
    
    var room2 = document.getElementById("roomId").value;
    var userId = document.getElementById("userId").value;
     
    //http://phspopos.dothome.co.kr/chat/talk
    window.open(`#/chat/talk?roomId=${room2}&userId=${userId}`, '' , 'width=500, height=700');
    //console.log('2222');
    //window.open(`http://phspopos.dothome.co.kr/chat/talk?roomId=${room2}&userId=${userId}`, '' , 'width=500, height=700');
  }

  return(<>
    <Navi></Navi>
    {/* <h2>Firebase - Realtime DataBase Chatting</h2> */}
    {/* input 에 앞에서 생성한 ref변수를 추가하여 DOM에 접근한다
    이렇게 하면 getElementXX와 같은 함수 없이 쉽게 접근 할 수 있다.*/}
    {/* 대화방의 아이디는  room1로 고정한다. 단 필요하다면 변경이하거나
    입력하면 된다.  */}
    {/* 방명 : <input type="text" name="roomId" value="room2" ref={refRoom} /><br/>
    대화명 : <input type="text" name="userId" ref={refId} /> <br/> */}
    {/* 버튼을 누르면 팝업으로 대화창을 오픈한다. */}

  <div className="form-container">
    <table border="1" className="input-table" name="myForm">
      <tbody>
        <tr>
          <td>방명</td>
          <td><input type="text" name="roomId" id="roomId" value="room2" /></td>        
        </tr>
        <tr>
          <td>아이디</td>
          <td><input type="text" name="userId"  id="userId" value={result.id} /></td>        
        </tr>
        <tr>        
          <td colSpan="2"><button type="button" onClick={openChatWin}>채팅시작</button></td>        
        
          {/* <button onClick={removeSession}>로그아웃</button> */}   
        
        </tr>
      </tbody>  
    </table>
  </div>  
  </>);

}

export default ChatStart;
