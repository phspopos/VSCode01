import React from "react";
import { Link } from 'react-router-dom';
import { BrowserRouter  } from 'react-router-dom';

function NotFound(){
  return (<>
    <div>
      <h2>Not Found</h2>
      <p>
        페이지를 찾을수 없습니다. ㅜㅜ <br/>
      </p>
      <Link to="/">홈으로</Link>
    </div>
  </>);
}

export default NotFound;