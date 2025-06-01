import { Link } from 'react-router-dom';
import "../navi.css"

const Navi = () => {
  return(<>
  {/* className='naviWrap' */}
    <nav>
        <Link to="/crud">사용자 등록</Link>&nbsp;&nbsp;
        <Link to="/listener">사용자 상세보기</Link>&nbsp;&nbsp;
        <Link to="/chat">체팅하기</Link>
        <Link to="/chatLogin">쳇팅 로그인</Link>
    </nav>
  </>);
}

export default Navi;
