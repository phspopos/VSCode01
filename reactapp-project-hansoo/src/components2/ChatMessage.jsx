//css파일을 추가하는 경우 src하위에 생성한 후 import해서 적용한다.
import '../Chat.css';
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
import { useSearchParams } from 'react-router-dom';
import chatBg from '../images/chat1.jpg';
import faceIcon from '../images/face.jpg';


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



//스크롤바를 최하단으로 내려주기 위한 JS함수
const scrollTop = (chatWindow) => {
  console.log('scrollTop 호출됨');
  //chatWindow.scrollTop = chatWindow.scrollHeight;  
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

//컴포넌트 정의
function ChatMessage(){

  //쿼리스트링으로 전달된 파라미터를 조작할때 사용하는 라우터 훅
  const [ searchParams, setSearchParams ] = useSearchParams();

  /////////////////////////////////////
  const [ result , setResult ] = useState([]);
  const [ bool, setBool ] = useState(true);
  const [ date2, setDate2 ] = useState('');
  const [ nicName2, setNicName ] = useState('');

  
  //방명, 대화창을 파라미터로 얻어온다.
  const roomId = searchParams.get('roomId');
  const userId = searchParams.get('userId');
  //채팅 내역을 보여지는 부분의 DOM참조
  const chatWindow = useRef();
  console.log( roomId, userId );
  
  //채팅 데이터 저장용
  const [ chatData, setChatData ] = useState('');

  //리얼타임에 대화내역 저장
  function messageWriter( chatRoom, chatId, chatMessage ){
    //고유키 생성. 데이터 저장시 중복되지 않는 일련번호와 같이 사용된다.
    const newPostKey = push( child( ref(realtime), 'temValue')).key;
    /*
      데이터 저장시 '방명'이 최상위 node가 되고, 하위에 '고유키'로 구분하여
      대화내용을 저장한다. 입력된 순서는 지켜지므로 별도의 정렬은 필요없다
      입력데이터는 대화명과 내용으로 구성된다.
    */
    set( ref( realtime, chatRoom+"/"+newPostKey),{
      id: chatId,
      message: chatMessage,
      date: nowDate(),
    });
    console.log('입력성공');
  }

  /*
    Realtime리스너 정의. 새롭게 입력된 대화내용을 실시간으로 얻어온다
    채팅내역이 저장된 'room1' 노드를 참조하는 변수를 생성 후 사용한다.
  */
  const dbRef = ref( realtime, roomId );
  console.log("디비알이에프");





  /*
  useEffect ( () => {
    

  const readUserData = async() => {
    //function readUserData( userId ){
    //데이터베이스 객체 얻어오기
    const dbRef = ref( getDatabase() );
    //console.log('111'+ dbRef );
    //노드에 등록된 아이디가 있는지 확인한 후 데이터를 가져온다.
    console.log('유저아이디 : ===' + userId );
    await get( child( dbRef, `member/${userId}`)).then( (snapshot) => {
            
      if( snapshot.exists() ){
        console.log('들어온다======.');
        //데이터가 존재하는 경우 콘솔에 출력한다.
        //console.log("값이다. ~~~"+ snapshot.val().id );
        //conso
        //setResult(snapshot.val());
        setResult(snapshot.val());
        console.log(' 레졸트 에 값 ' + result);
        //let memberInfo = snapshot.val();
        
        setDate2( snapshot.val().date );
        setNicName( snapshot.val().nicName );
        console.log(" 111 : "+date2);
        console.log(" 222 : "+nicName2);
        
        //console.log("리졸트~~~~ : " + result.id);        
        
        //let memberInfo = snapshot.val();

        //console.log("아이디 :: ~~"+ memberInfo.id );

        //setResult( memberInfo );

        //setBool(!bool);

      }else{
        console.log("No data available");
      }

      })
      .catch( ( error ) => {
        console.error( error );
      });
    }     

    readUserData();
   
    // if( bool ){
    //   readUserData();
    // }
     
    

  //리스너 생성. 새로운 대화내역이 확인되는 즉시 이벤트가 발생된다.
    onValue( dbRef, (snapshot) => {
      
      //readUserData();
      
      let showDiv = [];

      //새로운 메세징 추가시 스크롤바가 최하단에 이동하지 않는  문제 해결
      //onValue가 작동한 후 0.1초후에 스크롤바를 내리는 함수를  강제 실행
      setTimeout( () => {
        scrollTop( chatWindow.current );
      }, 100);

      //대화내용 전체를 배열로 받은 후 반복
      snapshot.forEach( (childSnapshot) => {

        //readUserData();

        //const childkey = childSnapshot.key
        const childData = childSnapshot.val();
        //console.log('리스너', childKey, childData.id, userId );

        */
     //대화내용은 종류에 따라 좌/우측으로 정렬
  //    if( childData.id === userId ){
  //     /* 데이터베이스에 등록된 데이터의 아이디와 대화창에 접속한
  //       사용자의 아이디가 일치하면 , 본인이므로 '우측' 으로 정렬한다. */
      
  //     showDiv.push(<div className='myMsg' style={{'textAlign' : 'right',backgroundColor: '#f5f5dc', color: 'blue' }}>        
  //       <img src={faceIcon} style={{ width:"50px" }}></img>
  //       {/* <br/>{result.date}&nbsp;&nbsp;<br/>{ result.nicName}<br/>{childData.message}</div>); */}
  //       {/* <br/>{date2}&nbsp;&nbsp;<br/>{nicName2}<br/>{childData.message}</div>); */}
  //       <br/>{result.date}&nbsp;&nbsp;<br/>{ result.nicName}<br/>{childData.message}</div>);
        
  //     }else{
  //       //상대방이 보낸 메세지는 좌측으로 정렬한다. 
  //       showDiv.push(<div>{childData.message}</div>)

  //       //showDiv.push(<div style={{'textAlign' : 'left',backgroundColor: '#e0f7fa', color: 'blue' }}><img src={faceIcon} style={{ width:"50px" }}></img>
  //       //<br/>{result.date}&nbsp;&nbsp;<br/>{ result.nicName}<br/>{childData.message}</div>)
  //     }
  //     //scrollTop( chatWindow.current );

  //     });
      
      
  //     setChatData( showDiv );
  //   });
    
    

  //   //readUserData();      

  // }, []);

  useEffect(() => {
    
    const fetchThenListen = async () => {
    // 1. 먼저 필요한 비동기 작업 수행 (예: 사용자 정보 읽기)
    const db = getDatabase();
    const userSnapshot = await get(child(ref(db), `member/${userId}`));
    
    if (userSnapshot.exists()) {
      const userData = userSnapshot.val();
      setResult(userData); // 상태 업데이트
      console.log('✔ 사용자 데이터 가져옴:', userData);

      // 2. 그 후에 onValue 등록
      const chatRef = ref(realtime, roomId);
      onValue(chatRef, (snapshot) => {
        // result 대신 userData 사용 → 더 안전
        let chatList = [];

      setTimeout( () => {
        scrollTop( chatWindow.current );
      }, 100);


        snapshot.forEach((childSnapshot) => {
          const message = childSnapshot.val();

          if (message.id === userId) {
            chatList.push(
              <div className='myMsg' style={{ textAlign: 'right', backgroundColor: '#f5f5dc', color: 'blue' }}>
                <img src={faceIcon} style={{ width: '50px' }} />
                <br />
                {message.date}&nbsp;&nbsp;<br />
                {userData.nicName}<br />
                {message.message}
              </div>
            );
          } else {
            chatList.push(
                <div className='myMsg' style={{ textAlign: 'left', backgroundColor: '#f0f8ff', color: 'black' }}>
                  <img src={faceIcon} style={{ width: '50px' }} /><br />
                  {message.message}
                </div>
              );
          }
        });

        setChatData(chatList);
      });
    } else {
      console.log('❌ 사용자 데이터 없음');
    }
  };

    // 함수 실행
    fetchThenListen();
}, [userId, roomId]);



  return(<>
    <div className='App' style={{          
              backgroundImage: `url('${chatBg}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              //height: '100vh'
      }}>
      <h2>Realtime 채팅</h2>
        대화명 : {userId} &nbsp;&nbsp;
        {/* X버튼을 누르는 것과 같이 창을 닫아준다. */}
        <button id='closeBtn' onClick={ () => { window.self.close();}}>채팅종료</button>
        {/* 채팅 내역이 출력되는 부분으로 ref를 사용한다. */}
        <div id='chatWindow' ref={chatWindow}>
          {chatData}
        </div>
        <div>
          <form onSubmit={ (e) => {
            e.preventDefault();

            //Event의 target  속성으로 폼값을 얻어온다.
            let chatRoom = e.target.chatRoom.value;
            let chatId = e.target.chatId.value;
            console.log( chatRoom, chatId );

            //빈값 검증
            if( chatId === '' ){
              alert("대화명을 입력하세요");
              return;
            }

            //입력한 메세지 얻어오기
            let message = e.target.message.value;

            if( message === '' ){
              alert("메세지를 입력하세요");
              return;
            }
            
            console.log('submit', chatRoom, chatId, message );
            //입력한 폼값을 정리해서 realtim에 입력한다.
            messageWriter( chatRoom, chatId, message );
            //입력이 완료되면 입력란을 비워준다.
            e.target.message.value = '';

          }}>

            {/* 룸명과 아이디는 hidden상자로 표시 */}
            <input type='hidden' name='chatRoom' value={roomId} />
            <input type='hidden' name='chatId' value={userId} />
            {/* 메세지 입력상자와 전송 버튼 표시 */}
            <input type='text' name='message' />
            <button type='submit' >전송</button>
          </form>
        </div>

    </div>
  
  </>);


}

export default ChatMessage;
