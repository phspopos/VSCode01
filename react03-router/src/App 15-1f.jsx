/*
react-router-dom 으로 부터 임포트한 컴포넌트와 관련 훅
  
*/
import {useState} from 'react';
import { Routes, Route, Link, NavLink } from 'react-router-dom';
import { Outlet, useLocation, useSearchParams } from "react-router-dom";


/*NavLink 컴포넌트는 a 태그와 같이 하이퍼링크를 제공한다
단 a태그에 preventDefault() 가 적용된 형태로 화면의 깜빡임없이 페이지
이동을 할 수 있다. 또한 링크를 클릭했을때 active라는 클래서 속성을
자동으로 추가해 준다.*/ 
const TopNavi = () => {
  return (<>
    <nav>
      <NavLink to="/">HOME</NavLink>&nbsp;
      <NavLink to="/intro">인트로</NavLink>&nbsp;
      <NavLink to="/intro/router">Router관련Hook</NavLink>&nbsp;
      <NavLink to="/xyz">잘못된URL</NavLink>&nbsp;
      {/*a 태그를 사용하는 경우 화면의 깜박임이 있으므로 이벤트 객체를
      통해 반드시 preventDefault() 함수를 사용해야 한다. */}
      <a href='/aTag' onClick={ (e) => {
        e.preventDefault();
      }}>A태그</a>&nbsp;
      {/* Link 컴포넌트느 NavLink와 기느은 동일하지만,active 속성값이
      부여되지 않는다.*/}
      <Link to="/linkTag">Link컴포넌트</Link>

    </nav>
  </>);
}
/*
  Outlet 컴포넌트
  : 웹사이트 제작시 공통으로 사용되는 레이아웃에서 특정 요청에 따른
  내용만 변경해야 할때 사용한다.
*/
const CommonLayout = () => {
  return (<>
    <header style={ { background:'lightgray', padding: '10px' } }>
      Outlet 컴포넌트 알아보기
    </header>
    <article>
        {/*각 페이지의 컴포넌트가 보여지는 부분에 설정한다. */}
        {/* 각 페이지에 해당하는 컴포넌트가 보여지는 부분에 설정한다. */}
        <Outlet />
    </article>
    <footer style={ { background : 'lightgray', padding: '10px' }}>
      공통 레이아웃
    </footer>
  </>);
}

const Home = () => {
  return (<>
    <h2>React Home</h2>
    <p>
      React Router에 대해 학습합니다.
    </p>
  </>);
}

const LayoutIndex = () => {
  return (<>
    <h2>레이아웃 인덱스 페이지</h2>
    <ul>
      <li>Outlet 컴포넌트 위치에 출력됩니다.</li>
      <li>Route 설정시 index로 지정합니다.</li>
    </ul>
  </>);
}

const NotFound = ()=> {
  return (<>
    <div>
      <h2>Not Found</h2>
      <p>
        페이지를 찾을수 없습니다. ㅜㅜ<br/>
        <Link to="/">Home</Link>
      </p>
    </div>
  </>);
}

const RouterHooks = () => {
  return (<>
    <h2>라우터 관련 Hook </h2>
  </>);
}


function App(){
       
  return (<>
    <div className="App">
      <TopNavi></TopNavi>
      <Routes>
        <Route path="/" element={ <Home></Home>} />
        <Route path="/intro" element={<CommonLayout /> }>
          <Route index element={ <LayoutIndex />} />
          <Route path="router" element={ <RouterHooks />} />
        </Route>
        <Route path="*" element = { <NotFound></NotFound> } />
      </Routes>
    </div>


  </>);
}

export default App;
