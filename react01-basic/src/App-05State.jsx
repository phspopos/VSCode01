import {useState} from 'react';

//Top컴포넌트 정의
function Top ( props ){
  return (<>
    <h2><a href='/' onClick={ (event) => {
      //이벤트 객체를 통해 화면의 새로고침(하이퍼링크 이동) 차단
      event.preventDefault();
      /* 프롭스로 전달된 함수를 호출한다. 이때 인수로 both를 전달하여
      스테이트를 변경한다. 스테이트가 변경되면 즉시 리렌더링이 되면서
      화면의 변화가 생긴다.*/
      props.myModeChange('both');
    }}>React - State 변경하기</a></h2>
  </>);
}

function MyCont1 ( props ){
  return (<>
    <li><a href='/' onClick={ (event) => {
      event.preventDefault();
      props.myModeChange('front');
    }}>프런트앤드</a></li>

        <li>프런트 앤드</li>
        <ul>
          <li>HTMl5</li>
          <li>CSS3</li>
          <li>Javascript</li>
          <li>jQuery</li>
        </ul>
  </>);
}

function MyCont2( props ){
  return(<>

    <li><a href='/' onClick={ (event) => {
      event.preventDefault();
      props.myModeChange('back');
    }}>백앤드</a></li>

    <ul>
      <li>Java</li>
      <li>oracle</li>
      <li>JSP</li>
      <li>Spring Boot</li>
     </ul>
  </>);
}

/*
  React Hooks (훅)
  React 16.8부터 새롭게 기능으로 함수형 컴포넌트에서 state와
  수명주기를 연동할 수 있게 해주는 특수한 함수를 말한다<div className="훅은"></div>
  훅은 import르 먼저 진해한 후 useXYZ()와 같은 패턴의 함수를 선언하여
  사용하면 된다.
*/

/*
  useState() : 리액트에서 상태값을 가지는 state의 값을 변경하거나 초깃값을
  부여할때 사용한다. 이 함수의 반환값은 배열인데
  0번 요소는 state의 초깃값으로 저장하는 변수이고
  1번 요소는 이값을 변경하는 함수로 사용한다<div className="구조분"></div>
  구조분할당을 이용해서 좌측항의 배열로 각각 값을 할당한다.

*/
function App(){
  
  /* 컴포넌트의 상태 관리를 위한 state생성. state의 변수명은 mode, 초기
  값은 both로 설정. 이를 변경하기 위한 함수는 setMode()로 정의한다. */
  const[ mode, setMode ] = useState('both');
  //컴포넌트 저장을 위한 변수 선언
  let contents = '';

  
  if( mode == 'front' ){
    //mode 값이 front면 Mycont1 컴포넌트만 변수에 저장후 렌더링한다.
    contents = <>
    {/*각 컴포넌트에서는 myModeChange라는 프롭스를 전달하게 되는데,
    스테이트로 정의한 mode값을 매개변수를 통해 변경하는 기능을 
    가지고 있다. */}
      <MyCont1 myModeChange = { (mode) => {
        setMode(mode);
      }}></MyCont1>
    </>
  
}else if( mode == 'back'){
  contents = <>
    <MyCont2 myModeChange = { (mode) => {
        setMode(mode);
      }}></MyCont2>
  </>

}else{
  //console.log("1111");
  contents = <>
    <MyCont1 myModeChange= { (mode) => {
      setMode(mode);
    }}></MyCont1>
    <MyCont2 myModeChange = { (mode) => {
      setMode(mode);
    }}></MyCont2>

  </>
}
  
  return (<>
    <div className="App">
      
        <Top myModeChange={ (mode) => {
          setMode(mode);
        }}></Top>

        <ol>
          {/* 앞에서 if문을통해 mode가 어떤값인지에 따라 설정된 컴포넌트를 
          이 부분에서 랜더링한다. */}
          
          {contents}
        </ol> 

    </div>

  </>);
}

export default App
