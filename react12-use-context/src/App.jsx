
//컨텍스트 임포트
import { useState } from 'react';
import { SimpleContext } from './context/SimpleContext';
import { ThemeContext } from './context/ThemeContext';

//모듈화 된 컴포넌트 임포트
import Page from './commons/Page';

function App() {
  
  //테마변경을 위한 스테이트
  const [ isDark, setIsDark ] = useState(false);

  /*
    데이터를 공유를 위한 프로바이더는 2개이상 겹쳐서 래핑할 수 있다.
  */
  return (<>
  {/* SimpleContext를 주석처리하면 모듈에서 초기화 한 값이 출력되고,
  활성화 하면 value 속성으로 부여한 값이 출력된다. 즉 프로바이더로 래핑하여
  value로 적용한 값이 우선순위가 높다. */}
    {/* <SimpleContext.Provider value={'Welcome 헝딜동'}>   */}
    
      <ThemeContext.Provider value={ { isDark, setIsDark } }>
        <div className="App">
          <Page></Page>
        </div>
      </ThemeContext.Provider>
    
    {/* </SimpleContext.Provider> */}
  </>)
}

export default App
