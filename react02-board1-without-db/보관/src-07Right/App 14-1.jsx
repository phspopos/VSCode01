import {useState} from 'react';
//import './App.css';

import NavList from './component/navigation/NavList';
import NavView from './component/navigation/NavView';
import NavWrite from './component/navigation/NavWrite';
import ArticleList from './component/article/ArticleList';
import ArticleView from './component/article/ArticleView';
import ArticleWrite from './component/article/ArticleWrite';


const fx3 = (a,b ) =>{
  console.error('에러발생됨');
}

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

function App(){

  const boardData = [
    { no:1, title:'오늘은 React공부하는날', writer:'낙짜샘', date:'2023-01-01'
      ,contents:'React를 뽀개봅시당' },
      { no:2, title:'어제는 Javascript공부해씸', writer:'유겸이', date:'2023-03-03'
      ,contents:'Javascript는 할게 너무 많아요' },
      { no:3, title:'내일은 Project해야징', writer:'개똥이', date:'2023-05-05'
      ,contents:'Project는 뭘 만들어 볼까?' }
  ];
 
  const [ mode, setMode ] = useState('list');

  // 선택한 게시물의 ㅣ일련번호를 저장. 첫실행시에는 선택한 게시물이 없으므로 null을 초기화  
  const[ no, setNo ] = useState(null);

  //선택할 게시물의 객체를 저장할 변수 추가 { no:1, title:'오늘은 React공부하는날' 와
  //같은 객체를 정장
  let articleComp, navComp, titleVar, selectRow;

  if( mode === 'list' ){
    titleVar = '게시판-목록(props)';
    navComp = <NavList onChangeMode={ () => {
      setMode('write');
    }}></NavList>

    articleComp = <ArticleList boardData = {boardData} onChangeMode={(no) => {
      console.log("선택한 게시물 번호 : " + no);
      //화면을 '열람'으로 전환
      setMode('view');
      ///선택한 게시물의 일련번호로 스테이트 변경
      setNo(no);
    }}></ArticleList>;

  }else if( mode === 'view' ){
    titleVar = '게시판-쓰기(props)';
    
    navComp = <NavView onChangeMode={ (pmode) => {
      setMode(pmode);
    }}></NavView>
    console.log("현재no : " , no, typeof(no));

    //선택한 게시물의 일련번호와 일치하는 객체를 검색하기 위해 반복
    for( let i = 0; i <boardData.length; i++ ){
      if( no === boardData[i].no ){
       //일치하는 게시물이 있다면 변수에 저장
        selectRow = boardData[i];
      }
    }

    //검색된 게시물을 프룹스를 통해 자식 컴포넌트로 전달
    articleComp = <ArticleView selectRow={ selectRow }></ArticleView>;
  
  }else if( mode === 'write' ){
    titleVar = "게시판-쓰기(props)";
    navComp = <NavWrite onChangeMode={ () => {
      setMode('list');
    }}></NavWrite>
    articleComp = <ArticleWrite></ArticleWrite>;
  
  }else{
    navComp = <ReadyComp></ReadyComp>;
    articleComp = '';
  }
  

  return (<>

    <div className="App">      
        <Header title={titleVar}></Header>
        {navComp}
        {articleComp}
    </div>

  </>);
}

export default App;
