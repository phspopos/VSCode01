{/* <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script> */}



{/* <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script> */}


  

function Popup(){
  //const zipRef = useRef('');
  //const addr1Ref = useRef('');
  //const addr2Ref = useRef('');

  const zipRef = "";
  const addr1Ref = "";
  const addr2Ref = "";


  const execDaumPostcode = () => {
    //new window.daum.Postcode()
    new window.daum.Postcode({
      oncomplete: function (data) {
       
        
        let addr = '';
        let extraAddr = '';

        if (data.userSelectedType === 'R') {
          addr = data.roadAddress;
        } else {
          addr = data.jibunAddress;
        }

        if (data.userSelectedType === 'R') {
          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }
          if (data.buildingName !== '' && data.apartment === 'Y') {
            extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
          }
          if (extraAddr !== '') {
            extraAddr = ' (' + extraAddr + ')';
          }
        }
        
        //if (zipRef.current) zipRef.current.value = data.zonecode;
        //if (addr1Ref.current) addr1Ref.current.value = addr + extraAddr;
        //if (addr2Ref.current) addr2Ref.current.focus();



      }
    }).open();
  };

  /*
  window.onload = function(){
    document.getElementById("address_kakao").addEventListener("click", function(){ //주소입력칸을 클릭하면
        //카카오 지도 발생
        new daum.Postcode({
            oncomplete: function(data) { //선택시 입력값 세팅
                document.getElementById("address_kakao").value = data.address; // 주소 넣기
                document.querySelector("input[name=address_detail]").focus(); //상세입력 포커싱
            }
        }).open();
    });
}
*/
////////////////////////////////////////////////////

// function sample6_execDaumPostcode() {
        
//         console.log('22222');
//         new daum.Postcode({
//             oncomplete: function(data) {
//                 // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

//                 // 각 주소의 노출 규칙에 따라 주소를 조합한다.
//                 // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
//                 var addr = ''; // 주소 변수
//                 var extraAddr = ''; // 참고항목 변수

//                 //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
//                 if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
//                     addr = data.roadAddress;
//                 } else { // 사용자가 지번 주소를 선택했을 경우(J)
//                     addr = data.jibunAddress;
//                 }

//                 // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
//                 if(data.userSelectedType === 'R'){
//                     // 법정동명이 있을 경우 추가한다. (법정리는 제외)
//                     // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
//                     if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
//                         extraAddr += data.bname;
//                     }
//                     // 건물명이 있고, 공동주택일 경우 추가한다.
//                     if(data.buildingName !== '' && data.apartment === 'Y'){
//                         extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
//                     }
//                     // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
//                     if(extraAddr !== ''){
//                         extraAddr = ' (' + extraAddr + ')';
//                     }
//                     // 조합된 참고항목을 해당 필드에 넣는다.
//                     document.getElementById("sample6_extraAddress").value = extraAddr;
                
//                 } else {
//                     document.getElementById("sample6_extraAddress").value = '';
//                 }

//                 // 우편번호와 주소 정보를 해당 필드에 넣는다.
//                 document.getElementById('sample6_postcode').value = data.zonecode;
//                 document.getElementById("sample6_address").value = addr;
//                 // 커서를 상세주소 필드로 이동한다.
//                 document.getElementById("sample6_detailAddress").focus();
//             }
//         }).open();
//     }


    // function sample6_execDaumPostcode() {
    //   console.log("22222");
      
    //   <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>

	  //       new daum.Postcode({
	  //           oncomplete: function(data) {
	  //               // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
	
	  //               // 각 주소의 노출 규칙에 따라 주소를 조합한다.
	  //               // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
	  //               var addr = ''; // 주소 변수
	  //               var extraAddr = ''; // 참고항목 변수
	
	  //               //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
	  //               if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
	  //                   addr = data.roadAddress;
	  //               } else { // 사용자가 지번 주소를 선택했을 경우(J)
	  //                   addr = data.jibunAddress;
	  //               }
	
	  //               // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
	  //               if(data.userSelectedType === 'R'){
	  //                   // 법정동명이 있을 경우 추가한다. (법정리는 제외)
	  //                   // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
	  //                   if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
	  //                       extraAddr += data.bname;
	  //                   }
	  //                   // 건물명이 있고, 공동주택일 경우 추가한다.
	  //                   if(data.buildingName !== '' && data.apartment === 'Y'){
	  //                       extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
	  //                   }
	  //                   // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
	  //                   if(extraAddr !== ''){
	  //                       extraAddr = ' (' + extraAddr + ')';
	  //                   }
	  //                   // 조합된 참고항목을 해당 필드에 넣는다.
	  //                   document.getElementById("sample6_extraAddress").value = extraAddr;
	                
	  //               } else {
	  //                   document.getElementById("sample6_extraAddress").value = '';
	  //               }
	
	  //               // 우편번호와 주소 정보를 해당 필드에 넣는다.
	  //               document.getElementById('sample6_postcode').value = data.zonecode;
	  //               document.getElementById("sample6_address").value = addr;
	  //               // 커서를 상세주소 필드로 이동한다.
	  //               document.getElementById("sample6_detailAddress").focus();
	                

					
		// 		}
	  //       }).open();
	  //   }


    
    <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>

      function sample4_execDaumPostcode() {
        new daum.Postcode({
            oncomplete: function(data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var roadAddr = data.roadAddress; // 도로명 주소 변수
                var extraRoadAddr = ''; // 참고 항목 변수

                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraRoadAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                   extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraRoadAddr !== ''){
                    extraRoadAddr = ' (' + extraRoadAddr + ')';
                }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById('sample4_postcode').value = data.zonecode;
                document.getElementById("sample4_roadAddress").value = roadAddr;
                document.getElementById("sample4_jibunAddress").value = data.jibunAddress;
                
                // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
                if(roadAddr !== ''){
                    document.getElementById("sample4_extraAddress").value = extraRoadAddr;
                } else {
                    document.getElementById("sample4_extraAddress").value = '';
                }

                var guideTextBox = document.getElementById("guide");
                // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
                if(data.autoRoadAddress) {
                    var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
                    guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
                    guideTextBox.style.display = 'block';

                } else if(data.autoJibunAddress) {
                    var expJibunAddr = data.autoJibunAddress;
                    guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
                    guideTextBox.style.display = 'block';
                } else {
                    guideTextBox.innerHTML = '';
                    guideTextBox.style.display = 'none';
                }
            }
        }).open();
    }






  return(<>



 {/* <input type="text" id="sample6_postcode" placeholder="우편번호"/>
<input type="button" onClick={sample6_execDaumPostcode} value="우편번호 찾기"/><br/>
<input type="text" id="sample6_address" placeholder="주소"/><br/>
<input type="text" id="sample6_detailAddress" placeholder="상세주소"/>
<input type="text" id="sample6_extraAddress" placeholder="참고항목"/> */}


{/* <input type="text" id="sample6_postcode" placeholder="우편번호"/>
<input type="button" onClick={sample6_execDaumPostcode} value="우편번호 찾기"/><br/>
<input type="text" id="sample6_address" placeholder="주소"/><br/>
<input type="text" id="sample6_detailAddress" placeholder="상세주소"/>
<input type="text" id="sample6_extraAddress" placeholder="참고항목"></input> */}

<input type="text" id="sample4_postcode" placeholder="우편번호"/>
<input type="button" onClick={sample4_execDaumPostcode}  value="우편번호 찾기"/><br/>
<input type="text" id="sample4_roadAddress" placeholder="도로명주소"/>
<input type="text" id="sample4_jibunAddress" placeholder="지번주소"/>
<span id="guide" style={{ color:'#999', display:'none' }}></span>
<input type="text" id="sample4_detailAddress" placeholder="상세주소"/>
<input type="text" id="sample4_extraAddress" placeholder="참고항목"/>


{/* <table>
        <tr>
            <th>이름</th>
            <td><input type="text" name="user_name"/></td>
        </tr>
        <tr>
            <th>주소</th>
            <td><input type="text" id="address_kakao" name="address" readonly /></td>
        </tr>
        <tr>
            <th>상세 주소</th>
            <td><input type="text" name="address_detail" /></td>
        </tr>
    </table> */}


  <h2>팝업창입니다.</h2>

    {/* <div>
      <button type="button" onClick={execDaumPostcode}>우편번호 찾기</button>
      <div>
        <input type="text" placeholder="우편번호" id="zipcode" value={zipRef} readOnly />
      </div>
      <div>
        <input type="text" placeholder="주소" id="addr1" value={addr1Ref} readOnly />
      </div>
      <div>
        <input type="text" placeholder="상세주소" id="addr2"  value={addr2Ref} />
      </div>
    </div> */}


  </>);

}

export default Popup;