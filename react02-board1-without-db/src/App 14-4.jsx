import {useState} from 'react';
//import './App.css';

import NavList from './components/navigation/NavList';
import NavView from './components/navigation/NavView';
import NavWrite from './components/navigation/NavWrite';
import ArticleList from './components/article/ArticleList';
import ArticleView from './components/article/ArticleView';
import ArticleWrite from './components/article/ArticleWrite';

import NavEdit from './components/navigation/NavEdit';
import ArticleEdit from './components/article/ArticleEdit';

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

  /* 작성을 위해 기존의 객체형 배열을 스테이트로 변환한다. 데이터를 추가, 삭제가
  있을때 새로운 렌더링이 되어야하기 때문이다. */
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
  /*새로운 게시물을 작성시 사용할 시퀀스(Sequese)용도의 스테이트 생성
  이미 3개의 게시물이 있으므로 초기값은 4로 설정한다.*/
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
      //3의 값을 받을 수있는 함수를 정의하여 프롭스로 전달
      console.log("App.js", t, w, c );

      //작성일을 Date객체를 통해 생성
      //현재날짜 
      let dateObj = new Date();
      //현재년도
      var year = dateObj.getFullYear();
      //getMonth() : 0~11까지를 반환하므로 +1을 해야 현재월을 구할 수 있다.
      var month = ( "0" + ( 1 + dateObj.getMonth() )).slice(-2);
      var day = ( "0" + dateObj.getDate() ).slice(-2);
      /*  월과 일이
      한자리인 경우에는 01과 같이 생성되고
      두자리인 경우에는 012와 같이 생성되므로 끝에서 두자리만 잘라낸다<div className="이때"></div>
      이때 slice(-2)를 사용한다.      
      */

      //0000-00-00형식으로 날짜를 생성
      let nowDate = year + "-" + month + '-' + day;
      console.log('데이트 : ' + nowDate );

      //추가할 객체 생성
      /* 스테이트 배열에 추가할 객체를 생성한다. 일련번호를 스테이트로 선언한
      nextNo를 사용하고, 작성폼에서 입력한 값을 받아서 구성한다. */
      let addBoardData = { no:nextNo, title:t, writer:w, contents:c, date:nowDate};
      
      /*
        배열의 복사본을 만들면 메모리에는 새로운 배열이 하나 추가된다. 복사본에
        데이터를 추가한후 이를 통해 state를 변경한다. 그러면 새롭게 생성된 배열의
        참조값을 통해  state를 변경했으므로 React는 변화를 감지하여 새로운 랜더링을
        하게된다
        javascript는 얕은 참조라는 개념을 통해 객체의 변화를 갑지하도록 설계되어
        있어 이와같이 처리하는 것이다.
      */ 

      //추가방법1
      //스프레드 연산자로 복사본 배열을 하나 생성한다.
      let copyBoardData = [...boardData];
      //복사된 배열에 새로운 객체를 추가 한다.
      copyBoardData.push( addBoardData );
      //복사된 배열을 통해 스테이트를 변경한다.
      setBoardData( copyBoardData );
    
      // 추가방법2(비추천)
      //boardData.push( addBoardData);
      //console.log(boardData );
      // setBoardData(boardData);

      //일련번호로 사용하는 스테이트를 1증가
      setNextNo( nextNo + 1 );
      //글쓰기가 완료되면 화면ㅇ르 '목록'으로 전환하다.
      setMode('list');

    }}></ArticleWrite>;
  
  }else if( mode === 'delete' ){
    //삭제1
    //새로운 빈 배열 생성
    let newBoardData = [];

    //데이터의 갯수만큼 반복
    for( let i = 0; i < boardData.length; i++ ){
      //삭제하려는 게시물이 아닌것만 배열에 추가한다.
      if( no !== boardData[i].no ){
        ///새로운 배열에는 삭제하려는 게시물이 추가도지 않는다.
        newBoardData.push(boardData[i]);
      }
    }

    //새로운 배열을 통해 스테이트를 변경하면 리렌더링이 된다.
    setBoardData( newBoardData );

    //(비추천)
    //삭제2
    // for( let i = 0; i < boardData.length; i++ ){
    //   if( no === boardData[i].no ){
    //     boardData.splice( i, 1 );
    //   }
    // }

    // setBoardData( boardData );

    //삭제가 완료되면 리스트로 전환한다.
    setMode('list');
    
  }else if( mode === 'edit' ){
    titleVar = '게시판- 수정(props)';

    navComp = <NavEdit onChangeMode = {() => {
      ///목록으로 전환하는 기능
      setMode('list');
    }} onBack={ () => {
      //열람으로 전환하는 기능
      setMode('view');
      //무시
      setNo(no);
    }}></NavEdit>

    //데이터의 갯수만큼 반복해서 수정할 게시물 선택
    for( let i = 0; i < boardData.length; i++ ){
      if( no === boardData[i].no ){
        selectRow = boardData[i];
      }
    }

    //수정할 게시물을 자식 컴포넌트로  전달
    articleComp = <ArticleEdit selectRow={selectRow}
    editAction={ (t, w, c ) => {

      /* 수정을 위한 객체를 생성. 단, 일련번호와 작성일은 기존의 값을
      그대로 사용한다.*/
      let editBoardData = { no:no, title:t, writer:w, contents:c, date:selectRow.date };
      console.log("수정내용", editBoardData );

      //스프레드 연산자로 기존 배열데이터의 복사본을 생성한다.
      let copyBoardData = [...boardData];      

      for( let i = 0; i < copyBoardData.length; i++ ){
        // 수정할 객체를 찾는다.
        if( copyBoardData[i].no === no ){
          //수정된 내용의 객체로 변경한다.
          copyBoardData[i] = editBoardData;
          //반복문 탈출
          break;
        }
      }

      //복사본을 통해 스테이트를 변경한다.
      setBoardData( copyBoardData );
      //수정된 내용 확인을 위해 '열람' 화면으로 전환한다.
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
