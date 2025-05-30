import { useState } from 'react'
import { SimpleContext } from './context/SimpleContext';



function App() {
  
  const [ isDark, setIsDark ] = useState(false);

  return (<>
    {/* <SimpleContext.Provider value={'Welcome 헝딜동'}> */}
  
    
      <ThemeContext.Provider value={ { isDark, setIsDark } }>
        <div className="App">
          <Page></Page>
        </div>
      </ThemeContext.Provider>

    
    {/* </SimpleContext.Provider> */}
  </>)
}

export default App
