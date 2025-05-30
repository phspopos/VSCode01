import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

import Header from "./Header";
import Content from './Content';
import Footer from './Footer';

const Page = () =>{
  const data = useContext(ThemeContext);
  console.log("page컴포넌트", data);
  return(
    <div className='page'>
      <Header></Header>
      <Content></Content>
      <Footer></Footer>
    </div>
  );
}

export default Page;