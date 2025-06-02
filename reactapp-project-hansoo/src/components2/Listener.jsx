import { useState, useEffect } from "react";
import { realtime } from "../firestoreConfig";
import { ref, onValue } from "firebase/database";
import { NavLink } from "react-router-dom";
import Navi from "./Navi";


function Listener(){
  
  console.log("aa.realtime", realtime);

  //realtime database로 부터 받은 데이터를 저장하기 위한 스테이트
  const [ fireData, setFireData ] = useState([]);

  //'users' 노드를 참조한 객체 생성
  //리스너( 이벤트 수신 대기 )
  const dbRef = ref( realtime, 'member');

  ///////////////////////////////////////////////////

  // 페이지 관련 설정
  const allData = fireData;
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
/////////////////////////////////////////////////////////////////////////////


  //1차 렌더링 후 내부의 코드 실행을 위한 생명주기 훅 선언
  useEffect ( () => {
    /*
      onValue ()
      : 특정 노드의 데이터를 읽고 변경사항을 감지하기 위해 수신대기하는
      함수로, 이벤트 발생 시점에 특정 경로에 있는 정적 스냅샷을 읽는데 사용된다
      노드 하위 요소를 포함하여 데이터가 변경될때마다 자동을 동작한다.      
    */
    onValue( dbRef, (snapshot) =>{
      let showTr = [];

      //이벤트 (입력 혹은 수정 등) 가 감지되면 데이터 전체를 배열로 가져온다.
      snapshot.forEach( (childSnapshot ) => {
        //각 객체의 Key와 Value를 추출
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        console.log( childKey, childData );

        // <Link to={'/modalView/'+doc.id+"/"+memberInfo.no} >{memberInfo.title}</Link>
        //화면에 출력할 내용을 만듬
        showTr.push(
          <tr key={childKey}>
            <td>{childKey}</td>
            <td>{childData.id}</td>
            <td>{childData.pw}</td>
            <td><NavLink to={"/chatEdit/"+ childData.id}>{childData.name}</NavLink></td>
            <td>{childData.nicName}</td>           
            <td>{childData.fireKey}</td>
          </tr>
        );
      });
      console.log( 'bb', showTr );
      //출력할 내용으로 스테이트를 변경후 리렌더링
      setFireData(showTr);
    })
  }, []);

  console.log("cc");

  return(<>
    <div className="App">
      <Navi></Navi>      
      {/* <h2>Firebase - Realtime Database App</h2> */}
      {/* <h3>02.Listener</h3> */}
      <h3>상세보기 리스트</h3>

      <NavLink to="/crud" style={{
                                          display: 'inline-block',
                                          padding: '8px 16px',
                                          backgroundColor: '#6c757d',  // Bootstrap의 btn-secondary 색
                                          color: 'white',
                                          textDecoration: 'none',
                                          borderRadius: '4px',
                                          fontSize: '14px',
                                          border: 'none'
                                        }}>등록하기</NavLink>

      <table border="1" className="table table-bordered">
        <thead>
          <tr className="text-center">
            <th>코드</th>
            <th>아이디</th>
            <th>패스워드</th>
            <th>이름</th>
            <th>닉네임</th>
            <th>고유키</th>
          </tr>
        </thead>
        {currentItems.map((item, idx) => (
          //  key={idx}
           <tbody>
              {item}
            </tbody>
          ))}
      </table>
      {/* <tfoot> */}
        
      {/* 페이지네이션 */}
      <div style={{ marginTop: '20px' }}>
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
      {/* </tfoot> */}

    </div>
    
  </>);


}

export default Listener;

