import React from "react";

function NavWrite( props ){
  console.log('NavWrite666');

  return (<>
    <nav>
      <a href="#" onClick={ function( event ){
          event.preventDefault();
          props.onChangeMode();
      }}>목록</a>
    </nav>
  </>);
}

export default NavWrite;
