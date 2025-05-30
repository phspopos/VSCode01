import { useContext } from "react";
import { SimpleContext } from "../context/SimpleContext";

const CompContext2a = () => {
  const contextData = useContext(SimpleContext);
  return(<>
    <div>
      <h4>Context2a</h4>
      {contextData}
    </div>
  </>);
}
export default CompContext2a; 
