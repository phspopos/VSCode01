import { useState } from 'react';

const Right1 = ( props ) => {
  return(<>
    <div>
      <h2>Rigtht1</h2>
      <Right2 onMyPlus2={ () => {
        props.onMyPlus1();
      }} ></Right2>
    </div>
  </>);
}

const Right2 = ( props ) => {
  return(<>
    <div>
      <h2>Rigtht2</h2>
      <Right3 onMyPlus3={ () => {
        props.onMyPlus2();
      }} ></Right3>
    </div>
  </>);
}

const Right3 = ( props ) => {
  return(<>
    <div>
      <h2>Rigtht3</h2>
      <input type='button' value="+" onClick={ () => {
        props.onMyPlus3();
      }}></input>    
    </div>
  </>);
}

const Left1 = ( props ) => {
  return(<>
    <div>
      <h2>Left1 : { props.number1 }</h2>      
      <Left2 number2 = {props.number1}></Left2>
    </div>
  </>);
}

const Left2 = ( props ) => {
  return(<>
    <div>
      <h2>Left2 : { props.number2 }</h2>      
      <Left3 number3 = {props.number2}></Left3>
    </div>
  </>);
}

const Left3 = ( props ) => {
  return(<>
    <div>
      <h2>Left3 : { props.number3 }</h2>           
    </div>
  </>);
}


function App() {

  const [ number, setNumber ] = useState(1);

  return (
    <div className="root">
      <h2>React - Redux : {number}</h2>
      <div id='grid'>
        <Left1 number1={number}></Left1>
        <Right1 onMyPlus1={ () => {
          setNumber( number +1);
        }}></Right1>
      </div>
    </div>
  );
}

export default App;
