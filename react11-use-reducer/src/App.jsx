import { useState } from 'react'
import { ThemeContext } from './context/ThemeContext';
import { SimpleContext } from './context/SimpleContext';

import Page from './components/Page';


function App() {
  
  const [ isDark, setIsDark  ] = useState(false);

  return (<>
  {/* <SimpleContext.Provider value={'welcome 헐딩동'}> */}
  <ThemeContext.Provider value={{ isDark, setIsDark }} >
    <div className='App'>
      <Page isDark={isDark} setIsDark={setIsDark}></Page>
    </div>
   </ThemeContext.Provider>
   {/* </SimpleContext.Provider> */}
  </>)
}

export default App
