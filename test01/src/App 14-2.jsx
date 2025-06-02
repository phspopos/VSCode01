import {useState} from 'react';
//import './App.css';

import NavList from './component/navigation/NavList';
import NavView from './component/navigation/NavView';
import NavWrite from './component/navigation/NavWrite';
import ArticleList from './component/article/ArticleList';
import ArticleView from './component/article/ArticleView';
import ArticleWrite from './component/article/ArticleWrite';

import NavEdit from './component/navigation/NavEdit';
import ArticleEdit from './component/article/ArticleEdit';

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

  const [ boardData, setBoardData ] = useState([
    { no:1, title:'오늘은 React공부하는날', writer:'낙짜샘', date:'2023-01-01'
      ,contents:'React를 뽀개봅시당' },
      { no:2, title:'어제는 Javascript공부해씸', writer:'유겸이', date:'2023-03-03'
      ,contents:'Javascript는 할게 너무 많아요' },
      { no:3, title:'내일은 Project해야징', writer:'개똥이', date:'2023-05-05'
      ,contents:'Project는 뭘 만들어 볼까?' }
  ]);
 
  const [ mode, setMode ] = useState('list');
  const[ no, setNo ] = useState(null);
  const[ nextNo, setNextNo ] = useState(4);

  let articleComp, navComp, titleVar, selectRow;

  if( mode === 'list' ){
    titleVar = '게시판-목록(props)';
    navComp = <NavList onChangeMode={ () => {
      setMode('write');
    }}></NavList>

    articleComp = <ArticleList boardData = {boardData} onChangeMode={(no) => {
      console.log("선택한 게시물 번호 : " + no);
      setMode('view');
      setNo(no);
    }}></ArticleList>;

  }else if( mode === 'view' ){
    titleVar = '게시판-쓰기(props)';
    navComp = <NavView onChangeMode={ (pmode) => {
      setMode(pmode);
    }}></NavView>
    console.log("현재no : " , no, typeof(no));
    for( let i = 0; i <boardData.length; i++ ){
      if( no === boardData[i].no ){
        selectRow = boardData[i];
      }
    }

    articleComp = <ArticleView selectRow={ selectRow }></ArticleView>;
  
  }else if( mode === 'write' ){
    titleVar = "게시판-쓰기(props)";
    navComp = <NavWrite onChangeMode={ () => {
      setMode('list');
    }}></NavWrite>
    articleComp = <ArticleWrite writeAction={ ( t, w, c ) => {
      console.log("App.js", t, w, c );

      //현재날짜 
      let dateObj = new Date();
      var year = dateObj.getFullYear();
      var month = ( "0" + ( 1 + dateObj.getMonth() )).slice(-2);
      var day = ( "0" + dateObj.getDate() ).slice(-2);
      let nowDate = year + "-" + month + '-' + day;

      //추가할 객체 생성
      let addBoardData = { no:nextNo, title:t, writer:w, contents:c, date:nowDate};
      
      //추가방법1
      let copyBoardData = [...boardData];
      copyBoardData.push( addBoardData );
      setBoardData( copyBoardData );
    
      // 추가방법2
      //boardData.push( addBoardData);
      //console.log(boardData );
      // setBoardData(boardData);

      setNextNo( nextNo + 1 );
      setMode('list');

    }}></ArticleWrite>;
  
  }else if( mode === 'delete' ){
    //삭제1
    let newBoardData = [];

    for( let i = 0; i < boardData.length; i++ ){
      if( no !== boardData[i].no ){
        newBoardData.push(boardData[i]);
      }
    }

    setBoardData( newBoardData );

    //삭제2
    // for( let i = 0; i < boardData.length; i++ ){
    //   if( no === boardData[i].no ){
    //     boardData.splice( i, 1 );
    //   }
    // }

    // setBoardData( boardData );

    setMode('list');

    
  }else if( mode === 'edit' ){
    titleVar = '게시판- 수정(props)';

    navComp = <NavEdit onChangeMode = {() => {
      setMode('list');
    }} onBack={ () => {
      setMode('view');
      setNo(no);
    }}></NavEdit>

    for( let i = 0; i < boardData.length; i++ ){
      if( no === boardData[i].no ){
        selectRow = boardData[i];
      }
    }

    articleComp = <ArticleEdit selectRow={selectRow}
    editAction={ (t, w, c ) => {
      let editBoardData = { no:no, title:t, writer:w, contents:c, date:selectRow.date };
      console.log("수정내용", editBoardData );
      
      let copyBoardData = [...boardData];
      
      for( let i = 0; i < copyBoardData.length; i++ ){
        if( copyBoardData[i].no === no ){
          copyBoardData[i] = editBoardData;
          break;
        }
      }

      setBoardData( copyBoardData );
      setMode('view');

    }}></ArticleEdit>

  }else{
    navComp = <ReadyComp></ReadyComp>;
    articleComp = '';
  }
  

  return (<>

    <div className="App">      
        <Header title={titleVar}></Header>
        {/*mode의 변화에 따라 다른 컴포넌트를 랜더링한다. */}
        {navComp}
        {articleComp}
    </div>

  </>);
}

export default App;
