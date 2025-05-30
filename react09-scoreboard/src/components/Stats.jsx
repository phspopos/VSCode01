import React from "react";

export default function Stats(props) {

  //플레이어 수
  let playerCount = props.playersData.length;
  
  //점수 총합
  let totalPoint = props.playersData.reduce( (prev, curr) => {
    console.log( curr.name+"점수", curr.score );
    prev += curr.score;
    return prev;
  }, 0);

  return (<>
    <table className="stats">
      <tbody>
      <tr>
        <td>Players:</td>
        <td>{playerCount}</td>
      </tr>
      <tr>
        <td>Total Points:</td>
        <td>{totalPoint}</td>
      </tr>
      </tbody>
    </table>    
  </>);
}