
//매개변수 props를 통해 객체 형식으로 받은 후 사용
const CompProps2 = (props) => {
  return(<>
    <h4>Props2 컴포넌트</h4>
    {props.propData} <br/>
    myNumber : { props.myNumber }
  </>);
}

export default CompProps2;
