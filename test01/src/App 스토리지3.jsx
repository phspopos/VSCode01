import { useEffect } from "react";
import { useState } from "react";

import { storage } from './storageConfig';
import { uploadBytes, ref, listAll, getDownloadURL } from 'firebase/storage';

function App() {

    const listRef = ref( storage, '' );

    const [ fileLists, setFileLists ] = useState([]);
    const [ renderFlag, setRenderFlag ] = useState(false);

    useEffect( () => {
      
      let fileRows = [];

      listAll(listRef)
        .then( (res) => {
          res.prefixes.forEach( (folderRef) => {
            console.log("폴더", folderRef);
          });
          res.items.forEach( (itemRef) => {
            const deleteRef = ref( storage, itemRef.fullPath );

            fileRows.push(
              <tr key={itemRef.name}>
                <td>{itemRef.bucket}</td>
                <td>{itemRef.fullPath}</td>
                <td>{itemRef.name}</td>
                <td><button type="button" onClick={ (e) => {
                    
                    if( window.confirm("삭제할까요?") ){
                      deleteObject( deleteRef ).then( () => {
                        console.log("파일 삭제 성공");
                        setRenderFlag(!renderFlag);
                      })
                      .catch( (error) => {
                        console.log("파일 삭제 실패");
                      });
                    }
                }}>삭제</button></td>
              </tr>
            );
          });
          setFileLists(fileRows);
        })
        .catch( (error) => {
          console.log("에러발생", error);
        });

    }, [renderFlag]);
  
    console.log('랜더링');
  
  return (<>
    <div className="App">
      <h2>Firebase = storage App</h2>
      <h3>파일 목록 및 삭제</h3>
      <table>
        <thead>
          <tr>
            <td>bucket</td>
            <td>fullPath</td>
            <td>name</td>
            <td>삭제</td>
          </tr>
        </thead>
        <tbody>
          {fileLists}
        </tbody>
      </table>
    </div>
  </>); 
}

export default App ;