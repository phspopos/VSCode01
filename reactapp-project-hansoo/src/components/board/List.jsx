import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
//import {firestore} from './firestoreConfig';
import { firestore } from '../../firestoreConfig';
import { collection, deleteDoc, doc, setDoc, getDoc, getDocs, query, where } from 'firebase/firestore';
import '../../memberList.css';



function List(){
  
  const [showData, setShowData] = useState([]);

    const getCollectionSeach = async ( search, sName ) => {
    
    //  if( sName == null ){
    //    navigate("/memberList");
    //  }

    let getRows = [];

    if( search === "id" ){

      const docRef = doc( firestore, "board", sName );
      const docSnap = await getDoc(docRef);

      if( docSnap.exists() ){
        console.log("Document data : ", docSnap.data() );
        getRows.push( docSnap.data() );
      
      }else{
        console.log("No such document!");
      }

    }else if( search === "name" ){
      
      const memberRef = collection( firestore, "board");
      console.log("memberRef", memberRef );
      
      const q = query( memberRef, where("writer","==",sName ));
      const querySnapshot = await getDocs(q);
      console.log("Document data : ", querySnapshot);

      querySnapshot.forEach( (doc) => {
        console.log("반복인출", doc.id, doc.data() );
        getRows.push( doc.data() );
      });

    }else if( search === "title" ){
      
      const memberRef = collection( firestore, "board");
      console.log("memberRef", memberRef );
      
      const q = query( memberRef, where("title","==",sName ));
      const querySnapshot = await getDocs(q);
      console.log("Document data : ", querySnapshot);

      querySnapshot.forEach( (doc) => {
        console.log("반복인출", doc.id, doc.data() );
        getRows.push( doc.data() );
      });

    }

    console.log(" 값 1111 "+ getRows );
    let trArray = [];  
   
    getRows.forEach( (row) => {
      trArray.push(
        <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.pass}</td>
            <td>{row.writer}</td>
            <td><Link to={'/view/' + row.id}>{row.title}</Link></td>
            <td>{row.contents}</td>
            <td>{row.date}</td>
          </tr>
      );
    });

    setShowData(trArray);

  }



  //////////////////////////////////////////////////////////////
  // 페이지 관련 설정
  const allData = showData;
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(allData.length / itemsPerPage);

  const pageGroupSize = 5;
  const [pageGroupIndex, setPageGroupIndex] = useState(0);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allData.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 버튼 그룹 계산
  const startPage = pageGroupIndex * pageGroupSize + 1;
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);
  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const handlePageClick = (page) => {
    setCurrentPage(page);
    setPageGroupIndex(Math.floor((page - 1) / pageGroupSize));
  };

  const handlePrevGroup = () => {
    if (pageGroupIndex > 0) {
      setPageGroupIndex(pageGroupIndex - 1);
      setCurrentPage((pageGroupIndex - 1) * pageGroupSize + 1);
    }
  };

  const handleNextGroup = () => {
    if ((pageGroupIndex + 1) * pageGroupSize < totalPages) {
      setPageGroupIndex(pageGroupIndex + 1);
      setCurrentPage((pageGroupIndex + 1) * pageGroupSize + 1);
    }
  };
/////////////////////////////////////////////////////////////////////

  useEffect(() => {
    const getCollection = async () => {
      let trArray = [];

      const querySnapshot = await getDocs(collection(firestore, "board"));
      querySnapshot.forEach((doc) => {
        let memberInfo = doc.data();

        trArray.push(
          <tr key={doc.id}>
            <td>{doc.id}</td>
            <td>{memberInfo.pass}</td>
            <td>{memberInfo.writer}</td>
            <td><Link to={'/view/' + doc.id}>{memberInfo.title}</Link></td>
            <td>{memberInfo.contents}</td>
            <td>{memberInfo.date}</td>
          </tr>
        );
      });
      return trArray;
    };

    getCollection().then((result) => {
      setShowData(result);
    });
  }, []);

  return(<>
  
   <div className="board-container">
      {/* <h2>Pagination (5개 단위 페이지 이동)</h2> */}
      <nav>
        <Link to="/write">글쓰기</Link>
      </nav>
      
        <form onSubmit={ (e) => {
        e.preventDefault();

        let search = e.target.search.value;
        let sName = e.target.sName.value;

        console.log( search + " = " + sName );

        // //getCollection( sf, ss );
        // if( sName == null ){
        //   getCollection();
        // }else{
          
        // }
        getCollectionSeach(search, sName);
        

      }}>
        <div id='myForm' style={{ textAlign: 'center' }}>
          <select name='search' style={{
                  padding: '6px 12px',
                  fontSize: '14px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  backgroundColor: 'white',    
                  backgroundPosition: 'right 10px center',
                  backgroundSize: '16px',
                  cursor: 'pointer',
          }}>
            <option value="title">제목으로 검색</option>            
            <option value="id" size="100">아이디</option>
            <option value="name">이름</option>            
          </select>&nbsp;&nbsp;&nbsp;
          
          <input type='text' name='sName' style={{ width: '150px', height: '25px', fontSize: '16px' }}/>&nbsp;&nbsp;&nbsp;
          <button type='submit' className='btn btn-secondary'>조회</button>&nbsp;&nbsp;&nbsp;
          {/* <NavLink to="/memberList">회원정보리스트</NavLink>&nbsp;&nbsp; */}
          {/* <button type='button' onClick={list} className='btn btn-secondary'>목록</button>&nbsp;&nbsp;&nbsp; */}
          <a href="/list"  style={{
                                          display: 'inline-block',
                                          padding: '8px 16px',
                                          backgroundColor: '#6c757d',  // Bootstrap의 btn-secondary 색
                                          color: 'white',
                                          textDecoration: 'none',
                                          borderRadius: '4px',
                                          fontSize: '14px',
                                          border: 'none'
                                        }}>목록</a>
        </div>
      </form>
      <h2>게시판</h2>
      <article>
        <table className="board-table" id="boardTable" style={{ width: "900px" }}>
          <thead>
            <tr>
              <th>아이디</th>
              <th>패스워드</th>
              <th>작성자</th>
              <th>제목</th>
              <th>내용</th>
              <th>날짜</th>
            </tr>
          </thead>

          {currentItems.map((item, idx) => (
            <tbody key={idx}>
              {item}
            </tbody>
          ))}
        </table>
      </article>                 
      <tfoot> 
      {/* 페이지네이션 style={{ marginTop: '20px' }} */}
      <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center'  }}>

        <button onClick={handlePrevGroup} disabled={pageGroupIndex === 0}>
          Prev
        </button>

        {visiblePages.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => handlePageClick(pageNum)}
            style={{
              margin: '0 4px',
              padding: '6px 12px',
              backgroundColor: currentPage === pageNum ? '#007bff' : '#f0f0f0',
              color: currentPage === pageNum ? 'white' : 'black',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',              
            }}
          >
            {pageNum}
          </button>
        ))}

        <button
          onClick={handleNextGroup}
          disabled={(pageGroupIndex + 1) * pageGroupSize >= totalPages}
        >
          Next
        </button>
      </div>
      </tfoot>

    </div>
  </>);

}

export default List;




