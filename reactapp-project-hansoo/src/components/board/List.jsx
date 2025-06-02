import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
//import {firestore} from './firestoreConfig';
import { firestore } from '../../firestoreConfig';
import { collection, deleteDoc, doc, setDoc, getDoc, getDocs, query, where } from 'firebase/firestore';
import '../../memberList.css';



function List(){
  
  const [showData, setShowData] = useState([]);

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




