//스테이트 사용을 위한 임포트
import {useState, useMemo } from 'react';
//import { Routes, Route, Link, NavLink } from 'react-router-dom';
//import { Outlet, useLocation, useSearchParams } from "react-router-dom";
//import { BrowserRouter } from 'react-router-dom'
//import { Route, Routes, Link, useNavigate } from 'react-router-dom';
//화면 이동을 위한 훅 임포트
//import { useNavigate } from 'react-router-dom';

/**  함수형 컴포넌트의 특징
 * -컴포넌트가 랜더링될때 정의된 함수가 실행된다
 * -이때 함수 내부의 모든 변수가 초기화된다ㅏ. 즉 렌더링될때마다 컴포넌트
 * 내부에 모든 코드가 실행되는 구조를 가진다.
 */

//호출시 시간이 매우 많이 걸리는 로직을 수행하는 함수(API 통신 등)
const longTimeCalculate = ( number )=>{
  console.log("시간이 많이 걸리는 계산");

  //12억번 정도 반복하는 for문
  for( let i = 0; i < 1234567890; i++ ){
    return number + 10000;
  }
}

  //매우 간단한 로직을 수행하는 함수
  const simpleCalculate = ( number) => {
    console.log("금방끝나는 계산");
    return number + 1; 
  }

function App() {
  //스테이트 생성
  const [ longTimeNum, setLongTimeNum ] = useState(1);
  const [ simpleNumber, setSimpleNumber ] = useState(1);

  /*
  step1 : App컴포넌트가 랜더링되면 아래 2개의 함수를 호출하여 반환된
  값으로 설정된다. 매개변수로는 스테이트가 인수로 전달된다.
  따라서 랜더링될때마다 2개의 함수는 실행되어 성능에 영향을
  미치게 된다.
  */
  //const longTimeSum = longTimeCalculate( longTimeNum );
  //const simpleSum = simpleCalculate( simpleNumber );
 
  /*
    step2 : 시간이 많이 걸리는 함수를 호출한 후 반환되는 값을 useMemo를
    통해 메모이제이션한다. 이 값은 longTimeNum이 변경될때만 다시 함수를
    호출하므로 , short번튼을 눌러있때는 실행되지 않는다. 즉 렌더링시
    불필요한 함수가 실행되는것을 차단할 수 있으므로 성능이 향상된다.
  */
  const longTimeSum = useMemo( () => {
    return longTimeCalculate(longTimeNum);
  }, [longTimeNum]);

  const simpleSum = simpleCalculate(simpleNumber);
  

return (<>
  <div className="APP">
    <h2>Long Time 계산기</h2>
        {/* input 상장의 스핀박스를 누를때마다 핸들러에서 각 setter 함수를
        호출하여 이 입력값을 통해 스테이트를 변경한다. */}
    <input type='number' value={longTimeNum} onChange={
      (e) => setLongTimeNum( parseInt( e.target.value ))} />
      <span>+1000 = { longTimeSum }</span>
      <h2>short Time 계산기</h2>
      <input type='number' value={ simpleNumber } 
      onChange={ (e) => { setSimpleNumber( parseInt(e.target.value))}} />
      <span>+1 = {simpleSum}</span>
  </div>
</>)
}

export default App
