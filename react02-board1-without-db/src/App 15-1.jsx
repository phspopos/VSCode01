import {useState} from 'react';
import { Routes, Route, Link, NavLink } from 'react-router-dom';
import { Outlet, useLocation, useSearchParams } from "react-router-dom";

const TopNavi = () => {
  return (<>
    <nav>
      <NavLink to="/">HOME</NavLink>&nbsp;
      <NavLink to="/intro">인트로</NavLink>&nbsp;
      <NavLink to="intro/router">Router관련Hook</NavLink>&nbsp;
      <NavLink to="/xyz">잘못된URL</NavLink>&nbsp;
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
