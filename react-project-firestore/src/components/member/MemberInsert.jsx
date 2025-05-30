import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
//import {firestore} from './firestoreConfig';
import { firestore } from '../../firestoreConfig';
import { collection, deleteDoc, doc, setDoc, getDoc, getDocs, query, where } from 'firebase/firestore';
import '../../member.css';



function MemberInsert(){

    return(<>

        {/* style={{ align: 'center'}} */}
    <h2 align="center">회원가입</h2>
        <form onSubmit={ (e) => {
            var id = e.target.id.value;
            var pw = e.target.pw.value;
            var re_pw = e.target.re_pw.value;
            var name = e.target.name.value;
            var email1 = e.target.email1.value;
            var email2 = e.target.email2.value;




        }}>
            <table border="1" cellPadding="10" width="1000"  align="center" style={{
                        margin: '0 auto', // 가운데 정렬 핵심
                        border: '1px solid black',
                        width: '1000px',
                        borderCollapse: 'collapse',
            }}>
                <tr>
                    <td className="td1"><span className="point">*&nbsp;</span>아이디</td>
                    <td>
                        <input type="text" name="id" size="18" maxLength="15" style={{ width: '200px'}}/>&nbsp;&nbsp;
                        <input type="button"  value="중복확인"  style={{ width: '120px', height: '40px', fontSize: '16px' }}/>
                        + 4~ 15자, 첫 영문자, 영문자와 숫자 조합
                    </td>
                </tr>
                <tr>
                    <td className="td1"><span className="point">*&nbsp;</span>비밀번호</td>
                    <td><input type="password" name="pw" size="14"style={{ width: '200px'}} /></td>
                </tr>
                <tr>
                    <td  className="td1"><span className="point">*&nbsp;</span>비밀번호 확인</td>
                    <td>
                        <input type="password" name="re_pw" size="14" style={{ width: '200px'}}/>&nbsp;&nbsp;(확인을 위해 다시 입력해 주세요)
                    </td>
                </tr>
                <tr>
                    <td className="td1"><span className="point">*&nbsp;</span>이름</td>
                    <td>
                        <input type="text" name="name" size="18" style={{ width: '200px'}}/>
                    </td>
                </tr>            
                <tr>
                    <td className="td1"><span className="point">*&nbsp;</span>이메일</td>
                    <td>
                        <input type="text" name="email1" size="16" style={{ width: '200px'}}/>@
                        <input type="text" name="email2" size="16" style={{ width: '200px'}}/>
                        <select name="last_email" onChange={ (e) => {
                            var email = e.target.email2.value;
                            e.target.email2.value = email;

                            //email2.style.

                        }}>
                            <option value="custom">직접입력</option>
                            <option value="gmail.com" checked>
                                gmail.com
                            </option>
                            <option value="naver.com">
                                naver.com
                            </option>
                            <option value="daum.net">
                                daum.net
                            </option>                        
                        </select>                    
                    </td>
                </tr>
                <tr>
                    <td rowSpan="3" className="td1">주소</td>
                    <td>                    
                        <input type="text" name="zipcode" size="12" style={{ width: '200px'}}/>
                        (우편번호)
                        <input type="button" value="주소찾기"  style={{ width: '120px', height: '40px', fontSize: '16px' }}/>
                    </td>
                </tr>
                <tr>
                    {/*
                    <td></td>
                    */}
                    <td><input type="text" name="addr1" size="100" style={{ width: '600px'}}/></td>
                </tr>
                <tr>
                    
                    {/* 
                    <!--
                    <td></td>
                    -->
                    */}

                    <td>
                        <input type="text" name="addr2" size="90" style={{ width: '600px'}}/>
                        + 나머지 주소
                    </td>                
                </tr>            
                <tr>
                    <td  className="td1"><span className="point">*&nbsp;</span>휴대전화</td>
                    <td>
                        <input type="number" name="phone1" size="4" maxLength="3" style={{ width: '80px'}}/>-
                        <input type="number" name="phone2" size="8" maxLength="4"style={{ width: '100px'}}/>-
                        <input type="number" name="phone3" size="8" maxLength="4"style={{ width: '100px'}}/> 
                        &nbsp;&nbsp;&nbsp;                    
                    </td>
                </tr>            
                
                <tr>
                    <td colSpan="2" style={{ textAlign:"center"}}>
                        <input type="submit" value="등록하기"  style={{ width: '120px', height: '40px', fontSize: '16px' }}/>&nbsp;&nbsp;
                        <input type="reset" value="새로쓰기" style={{ width: '120px', height: '40px', fontSize: '16px' }}/>&nbsp;&nbsp;
                        <Link to="/">로그인</Link>
                    </td>
                </tr>
            </table>
        </form>            
    </>);
}

export default MemberInsert;


