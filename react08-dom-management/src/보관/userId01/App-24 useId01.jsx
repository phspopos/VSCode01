//스테이트 사용을 위한 임포트
import { useId, useRef, useState, useMemo, useEffect, useCallback } from 'react';
//import { Routes, Route, Link, NavLink } from 'react-router-dom';
//import { Outlet, useLocation, useSearchParams } from "react-router-dom";
//import { BrowserRouter } from 'react-router-dom'
//import { Route, Routes, Link, useNavigate } from 'react-router-dom';
//화면 이동을 위한 훅 임포트
//import { useNavigate } from 'react-router-dom';

function App() {
  /*
    useId() 는 고유한 아이디를 생성할때 사용하는 훅이다. DOM의
    아이디를 부여하거나 라벨링을 할때 편리하다.
  */
  const myId = useId();
  console.log("myId", myId);  

return (<>
  <div className='App'>
    <MyInput />
  </div>
</>);
}

function MyInput(){
  //두번째 아이디를 생성
  const ageId = useId();
  console.log("ageId", ageId);

  /*
    HTML에서의 label태그는 주로 체크박스나 라이오와 함께 사용된다.
    label태그의 for속성과 input태그의 id속성이 이맃하면 하나의 요소로
    라벨링되어 선택영역이 보다 넓어지는 효과가 있다
    단 for는 Javascript의 예약어이므로 JSX에서는 htmlFor라고 작성해야한다.
  */
  return(<>
    <div>
      {/* HTML속성을 사용해서 연결 */}
      <label htmlFor='name'>이름</label>
      <input type='text' id='name' />
      <br/>
      {/* useId를 사용해서 연결 */}
      <label htmlFor={ageId}>나이</label>
      <input type='text' id={ageId} />
    </div>
  </>);
}

export default App
