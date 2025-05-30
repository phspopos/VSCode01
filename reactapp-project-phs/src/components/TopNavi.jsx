import { NavLink } from "react-router-dom";

function TopNavi(props) {
  return (<>
      <nav>
          <NavLink to="/">Home</NavLink>&nbsp;&nbsp;
          <NavLink to="/memberInsert">회원가입</NavLink>&nbsp;&nbsp;
          <NavLink to="/login">로그인</NavLink>&nbsp;&nbsp;

          
      </nav>
  </>); 
}
export default TopNavi ;