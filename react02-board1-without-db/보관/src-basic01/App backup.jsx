import {useState} from 'react';
import './App.css';

function ReadyComp(){
  return(<>
    <div>
      <h3>컴포넌트 준비중입니다.</h3>
      <a href='/'>Home바로가기</a>
    </div>
  </>);
}

function Header( props ){
  console.log('props', props.title );
  return (<>
    <header>
      <h2>{ props.title }</h2>
    </header>
  </>);
}

//목록의 내비게이션
function NavList( props ){
  return(<>
    <nav>
      <a href='/' onClick={ function( event ){
        event.preventDefault();
        props.onChangeMode();
      }}>글쓰기</a>
    </nav>
  </>);
}

//내용보기의 네비게이션

function Nav( props ){
  return (<>
    <nav>
      
     <a href='/' onClick={ (event) => {
            event.preventDefault();
            props.onChangeMode( );
        }}>   

        글쓰기</a>
    </nav>
  </>);
}

function Article( props ){
const lists = [];

for( let i = 0; i < props.boardData.length; i++ ){
  let row = props.boardData[i];
  lists.push(
    <tr key={ row.no }>
        <td className="cen">{row.no}</td>
        <td><a href={'/read/'+row.no} onClick={ (event) => {
            event.preventDefault();
            props.onChangeMode( row.no );
        }}>{row.title}</a></td>
        <td className="cen">{row.writer}</td>
        <td className="cen">{row.date}</td>
    </tr>
  );
}

  return (<>
    <article>
      
      <table id="boardTable">
        <thead>
          <tr>
            <th>No</th>
            <td>제목</td>
            <td>작성자</td>
            <td>날짜</td>
          </tr>
        </thead>
        <tbody>
          {lists}
        </tbody>
      </table>
    </article>
  
  </>);
}

function App(){

  const boardData = [
    { no:1, title:'오늘은 React공부하는날', writer:'낙짜샘', date:'2023-01-01'
      ,contents:'React를 뽀개봅시당' },
      { no:2, title:'어제는 Javascript공부해씸', writer:'유겸이', date:'2023-03-03'
      ,contents:'Javascript는 할게 너무 많아요' },
      { no:3, title:'내일은 Project해야징', writer:'개똥이', date:'2023-05-05'
      ,contents:'Project는 뭘 만들어 볼까?' }
  ];
 
  return (<>

    <div className="App">      
        <Header title="게시판-목록(props)"></Header>
        <Nav onChangeMode = { function(){
          alert('선택한 페이지로 이동');
        }}></Nav>
        <Article boardData={boardData} onChangeMode={ (no) => {
          alert('선택한 게시물 번호 : ' + no );
        } }></Article>
    </div>

  </>);
}

export default App
