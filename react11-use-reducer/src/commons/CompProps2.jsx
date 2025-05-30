
const CompProps2 = (props) => {
  return(<>
    <div>
      <h4>Props2 컴포넌트</h4>
      {props.proData2}<br/>
      myNumber : { props.myNumber }
    </div>
  </>);
}

export default CompProps2;