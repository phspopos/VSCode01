import {useState} from 'react';
import { Routes, Route, Link, NavLink } from 'react-router-dom';
import { Outlet, useLocation, useSearchParams } from "react-router-dom";

const TopNavi = () => {
  return (<>
    <nav>
      <NavLink to="/">HOME</NavLink>&nbsp;
      <NavLink to="/intro">인트로</NavLink>&nbsp;
      <NavLink to="/intro/router">Router관련Hook</NavLink>&nbsp;
      <NavLink to="/xyz">잘못된URL</NavLink>&nbsp;
      <a href='/aTag' onClick={ (e) => {
        e.preventDefault();
      }}>A태그</a>&nbsp;
      <Link to="/linkTag">Link컴포넌트</Link>
    </nav>
  </>);
}

const CommonLayout = () => {
  return (<>
    <header style={ { background:'lightgray', padding: '10px' } }>
      Outlet 컴포넌트 알아보기
    </header>
    <article>
        {/*각 페이지의 컴포넌트가 보여지는 부분에 설정한다. */}
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

/* localhost/intro 경로가 요청될때 outlet 컴포넌트 위치에 삽입되어 렌더링 된다
  이 부분은 App 컴포넌트에 라우팅 처리되어 있다.
*/
const LayoutIndex = () => {
  return (<>
    <h2>레이아웃 인덱스 페이지</h2>
    <ul>
      <li>Outlet 컴포넌트 위치에 출력됩니다.</li>
      <li>Route 설정시 index로 지정합니다.</li>
    </ul>
  </>);
}

/*
  설정된 경로  외 잘못된 경로를 요청했을때 랜더링 되는 컴포넌트.
  백앤드에서는 이런 경우 404에러가 발생하게 된다.
*/
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

/* localhost/intro/router 경로가 요청되었을때 outlet 컴포넌트 부분에
삽입되어 랜더링 된다.*/
const RouterHooks = () => {
  return (<>
    <h2>라우터 관련 Hook </h2>
  </>);
}


function App(){
       
  return (<>
    
      {/* 라우팅 처리가 필요없는 컴포넌트는 전체페이지에서 공통으로
      랜더링되는 네비게이션을 주로 사용한다. */}
      <TopNavi></TopNavi>
        {/*  라우팅 처리가 필요한 컴포넌트는 아래와 같이 path, element라는
        속성을 통해 경로와 랜더링 할 컴포넌트를 지정한다. */}
      <Routes>
        <Route path="/" element={ <Home></Home>} />
        {/* 하위 경로가 필요한 경우에는 '중첩라우팅' 을 사용한다. */}
        <Route path="/intro" element={<CommonLayout /> }>
        {/* /intro로 요청이 들어오면 이 컴포넌트를 랜더링 */}
          <Route index element={ <LayoutIndex />} />
          {/*  /intro/router 로 요청이 들어오면 RouterHooks 이 컴포넌트를 랜더링*/}
          <Route path="router" element={ <RouterHooks />} />
        </Route>
        {/*  지정되지 않은 모든 경로에 대해서는 404 처리*/}
        <Route path="*" element = { <NotFound></NotFound> } />
        <Route path="*" element = { <NotFound></NotFound> } />
      </Routes>
    


  </>);
}

export default App;
