//스테이트 사용을 위한 임포트
import {useState, useMemo, useEffect, useCallback } from 'react';
//import { Routes, Route, Link, NavLink } from 'react-router-dom';
//import { Outlet, useLocation, useSearchParams } from "react-router-dom";
//import { BrowserRouter } from 'react-router-dom'
//import { Route, Routes, Link, useNavigate } from 'react-router-dom';
//화면 이동을 위한 훅 임포트
//import { useNavigate } from 'react-router-dom';


function App() {

  const [ playerData , setPlayerData ]  = useState([
    { idx: 1, name: '홍길동', score : 10 },
    { idx: 2, name: '손오공', score : 20 },
    { idx: 3, name: '유비', score : 30 },
    { idx: 4, name: '달타냥', score : 40 },
  ]); 

  const [ nextVal, setNextVal ] = useState(5);

  const addPlayerProcess = (pName) => {
    console.log("onAddPlayer", pName);
    let addPlayer = { idx: nextVal, name: pName, score: 0 };

    //추가후 화면이 리 렌더링 됨
    let copyPlayers = [...playerData];
    copyPlayers.push( addPlayer );
    setPlayerData( copyPlayers );

    //데이터가 추가되지만 리 렌더링 도지 않음
    playerData.push( addPlayer );
    setPlayerData( players );
    console.log(players);

    //추가후 시퀀스 증가
    setNextVal( nextVal + 1 );
  }

  const scoreChangeProcess = (flag, playerIdx ) => {
    console.log( 'idx', playerIdx, 'flag', flag);
    let copyPlayers = [...playerData];
    copyPlayers.forEach( (row) => {
      console.log( row.idx, row.name );

      if( row.idx === playerIdx ){
        console.log( row.name);
        
        if( flag === "+" ){
          row.score += 5;          
        }else {
          row.score -= 5;
        }
      }      
    });
    setPlayerData( copyPlayers );
  }

return (<> 
 
  <div className="scoreboard"> 
      <header title='My Scoreboard' playersData ={playerData} />
      {
        playerData.map( (playerRow) => (
          <player playereData = {playerRow} 
          onChangeScore={ scoreChangeProcess } />
        ))
      }
      <addPlayerForm onAddPlayer={ addPlayerProcess }></addPlayerForm>
   </div>

</>);
}

export default App
