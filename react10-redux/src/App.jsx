import { useReducer, useState } from 'react';
//import { legacy_createStore as createStore } from 'redux';
//import { Provider, useDispatch, useSelector  } from 'react-redux';

const Student = ({ name, dispatch, id, isHere}) => {
  return(<>
    <div>
      <span style={{
       textDecoration: isHere ? "line-through" : "none",
        color : isHere ? "gray" : "black",
      }} onClick={ () => {
        //alert("출석처리");
        dispatch( { type:'mark', param: {id} } );
      }}>{name}</span>

      <button onClick={ () => {
        //alert('삭제');

        if( confirm(" 삭제하시겠습니까? ")){
          //dispatch( { type:'add', param: {name} });
          dispatch( { type:'delete', param: {id} } );
        }

      }}>삭제</button>
    </div>
  </>); 
}

const reducer = ( state, action ) => {
  switch( action.type ){
    case 'add':
      const name = action.param.name;

      const newStudent = {
        id : Date.now(),
        name: name,
        isHere: false,
      }

      return{
        count : state.count + 1,
        students: [...state.students, newStudent ],
      }

    case 'delete':
      /*var id = action.param.id;
      console.log("id = " + id );
      const newStudent2 = [];
      for( let i = 0; i < state.students.length; i++ ){
          console.log("state.students = " + state.students[i].id);
          if( state.students[i].id !== id ){
            console.log("들어온다");
            newStudent2.push( state.students[i] );

          }
      }
      console.log( newStudent2 );
      */
      return {
       //students : newStudent2,

       count : state.count -1,
       students : state.students.filter(
        (student) => { return student.id != action.param.id }
       )

      } 
    case 'mark':   
      return {
        students: state.students.map( (student) => {

          if( student.id === action.param.id ){
            return { ...student, isHere : ! student.isHere }
          }
          return student;
        })
      }
    
    default:
  }
}

const initialState = {
  count : 1, 
  students : [
    {
      id: Date.now(), name: '김철수', isHere: false,
    },
  ],
}


function App() {

  const [ name, setName ] = useState(' ');
  const [ studentInfo, dispatch ] = useReducer( reducer, initialState );
  
  return (<>
  <div className="App">    
    <p>총학생수 : { studentInfo.count }</p>
    <input type='text' placeholder='이름을 입력하세요' 
    value ={name} onChange={ (e) => {
      setName( e.target.value );
    }}/>

    <button onClick={ () => {
      dispatch( { type:'add', param: {name} });
    }}>추가</button>
    {
      studentInfo.students.map( (student) => {
        return <Student key={student.id} name={student.name} 
        dispatch={dispatch} id={student.id}
        isHere = {student.isHere} />
      })
    }
  </div>
  </>);
      
}

export default App;
