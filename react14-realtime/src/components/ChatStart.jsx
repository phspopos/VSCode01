import { useRef } from "react";
import Navi from "./Navi";

const ChatStart = () => {

  //input 태그의 DOM 에 접근하기 위해 useRef로 변수선언
  /*
    useRef 훅을 통해 변수를 생성하면 current 라는 key를 가진 객체를 반환한다
    즉 { current : 초기값 } 과 같은 형태가 된다.
  */
  //대화방의 이름(아이디)
  const refRoom = useRef();
  //접속자의 아이디
  const refId = useRef();
/*
  open() 함수를 이용해서 채팅창을 팝업으로 오픈한다<div className="ㅎㄴ"></div>
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
    window.open(`/chat/talk?roomId=${refRoom.current.value}&userId=${refId.current.value}`, '' , 'width=500, height=700');

    //console.log('2222');
  }

  return(<>
    <Navi></Navi>
    <h2>Firebase - Realtime DataBase Chatting</h2>
    {/* input 에 앞에서 생성한 ref변수를 추가하여 DOM에 접근한다
    이렇게 하면 getElementXX와 같은 함수 없이 쉽게 접근 할 수 있다.*/}
    {/* 대화방의 아이디는  room1로 고정한다. 단 필요하다면 변경이하거나
    입력하면 된다.  */}
    방명 : <input type="text" name="roomId" value="room1" ref={refRoom} /><br/>
    대화명 : <input type="text" name="userId" ref={refId} /> <br/>
    {/* 버튼을 누르면 팝업으로 대화창을 오픈한다. */}
    <button type="button" onClick={openChatWin}>채팅시작</button>
  </>);

}

export default ChatStart;
