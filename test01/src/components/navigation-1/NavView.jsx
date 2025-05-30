import React from "react";

function NavView( props ){
console.log('NavView555');

  return(<>
    <nav>
      <a href="#" onClick={ function(event){
        event.preventDefault();
        props.onChangeMode('list');
      }}>목록</a>{' '}

      <a href="#" onClick={ function(event){
        event.preventDefault();
        props.onChangeMode('edit');
      }}>수정</a>{' '}

      <a href="#" onClick={ function(event){
        event.preventDefault();
        //HTML에서는 window객체를 생략하지만, JSX
        if( window.confirm('삭제할까요?')){
          props.onChangeMode('delete');
        }        
      }}>삭제</a>{' '}
    </nav>
  </>);

}

export default NavView;