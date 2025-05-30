import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
//import {firestore} from './firestoreConfig';
import { firestore } from '../../firestoreConfig';
import { collection, deleteDoc, doc, setDoc, getDoc, getDocs, query, where } from 'firebase/firestore';


function  Delete(){

 
  let params = useParams();
  console.log("idx999 = " + params.idx);
  let navigate = useNavigate();

  useEffect ( async () =>{

    if( confirm("삭제하시겠습니까") ){
      await deleteDoc( doc( firestore, "board", params.idx ));
      navigate("/");
    
    }else{
      //navigate("/eidt/"+params.idx);
      //navigate(-1);
    }    

  }, []);
  
  
  return(<>
    <h2>삭제 페이지</h2>
  </>);

}

export default Delete;