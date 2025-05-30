
const CompProps2 = (props) => {
  return(<>
    <h4>Props2 컴포넌트</h4>
    {props.propData} <br/>
    myNumber : { props.myNumber }
  </>);
}

export default CompProps2;
