import React from "react";

export default function Counter(props) {
  return (<>
    <div className="counter">
      <button className="counter-action decrement"
        onClick={ (e) => { 
          //alert('점수차감');
          console.log('-버튼', props.idx );
          props.onChangeScore('-', props.idx );
           }}> -</button>
      <span className="counter-score">{props.score}</span>
      <button className="counter-action increment"
        onClick={(e) => {
           //alert('점수증가'); 
           console.log('+버튼', props.idx );
           props.onChangeScore('+', props.idx );
           }}> +</button>
    </div>
  </>);
}