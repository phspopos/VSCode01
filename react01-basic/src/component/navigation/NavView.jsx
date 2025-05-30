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
        props.onChangeMode('delete');
      }}>삭제</a>{' '}
    </nav>
  </>);

}

export default NavView;