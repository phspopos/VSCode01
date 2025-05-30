import React from "react";


//함수형 컴포넌트 생성. 파일명과 동일한 이름으로 생성한다.
function ListComponent( props ){

  /*
    컴포넌트에서 실제 표현해야 하는 UI르 return 문 내부에 기술한다
    기존 클래스형 컴포넌트에서 render()함수가 있었는데,
    함수형에서는 return이 역할을 대신한다.
  */
  return(<>
  
  {/*  JSX를 통해 UI를 표현할때 최상위 엘리먼트는 반드시 하나여야
  한다. 현 시점에서는 React 에서 프레그먼트(Fraagment)를 제공하므로
  이를 통해 묶어주게 된다. 프레그먼트는 빈 꺽쇄괄호로 표현하면 
  된다. */}

     <header>
        <h2>게시판 - 목록</h2>
    </header>
    <nav>

    {/* a태그와 기본동작(화면이동)을 차단하고, 프롭스로 전달받은
    함수를 호출하여 스테이트를 write로 변경한다. 즉 작성 화면으로 
    전환하기 위한 링크를 생성한다. */}
    <a href="/" onClick={ (event ) =>{
        event.preventDefault();
        props.changeMode('write');

      }}>글쓰기</a>
      
    </nav>
    <article>
      <table  id="boardTable">
          <thead>
            <tr>
              <td>no</td>
              <td>제목</td>
              <td>작성자</td>
              <td>날짜</td>
            </tr>
          </thead>
          <tbody>
            {/*스타일 설정을 위해 상용한 class 속성은 className으로 변경
            해야한다. Javascript에는 이미 class키워드가 있기 때문이다. */}
            <tr>
              <td className="cen">1</td>
              <td><a href="/" onClick={ (event ) =>{
                        event.preventDefault();
                        props.changeMode('view');

                }}>오늘은 React 공부하는날</a></td>
              <td className="cen">낙짜샘</td>
              <td className="cen">2030-05-05</td>
            </tr>
          </tbody>
      </table>
    </article>
  
  </>);
}

export default ListComponent;
 