import React, { useState } from "react";

 /* 수정 페이지를 구성하기 위해 기존 데이터를 프롭스로 받은 후 input 의 value
 속성값으로 설정한다
 하지만 이 경우 input이 readOnly 속성으로 렌더링되어 기존의 내용을 수정할 수 
 없게 된다
 React에서 프롭스는 외부에서 내부로 전달되는 일종의 파라미터(인수) 이므로 
 수정할 수 없도로 '읽기 전용'으로 설정되어 있다."></div>*/
function ArticleEdit( props ){
  const [ title, setTitle ] = useState( props.selectRow.title );
  const [ writer, setWriter ] = useState( props.selectRow.writer );
  const [ contents, setContents ] = useState( props.selectRow.contents);
  console.log( "잘받아짐 : "+ title, writer, contents );

  return(<>
    <article>
        {/*submit 이벤트 처리는 쓰기와 완전히 동일하다 */}
        <form onSubmit={ (event) => {
          event.preventDefault();
          let title = event.target.title.value;
          let writer = event.target.writer.value;
          let contents = event.target.contents.value;
          console.log('ArticleEdit컴포', title, writer, contents );
          props.editAction( title, writer, contents );
        }}>

       
        <table id="boardTable">
            <tbody>
              <tr>
                <th>작성자</th>
                <td>                  
                 <input type="text" name="writer" 
                value={ writer } onChange={(event) =>{
                  console.log('11111');
                  setWriter( event.target.value );
                }}/>
                 </td>
              </tr>
              <tr>
                <th>제목</th>
                <td><input type="text" name="title" 
                value={ title } onChange={ (event) =>{
                  console.log('22222');
                  setTitle(event.target.value );
                }}/></td>
              </tr>
              <tr>
                <th>내용</th>
                <td><textarea name="contents" cols="22" rows="3" 
                value={ contents } onChange={(event) =>  {
                  console.log('33333');
                  setContents(event.target.value );
                }}></textarea></td>
              </tr>
            </tbody>
          </table>
            <input type="submit" value="수정하기" />
        </form>
        </article> 
  </>);
}
export default ArticleEdit;