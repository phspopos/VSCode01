
//파이어 베이스 서비스에 연결하기 위한 임포트
import { initializeApp } from "firebase/app";
//파이어 스토어 데이터 베이스 사용을 위한 임포트
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";


// 파이어 베이스 콘솔에서 발급받은 API저보(SDK정보)
// const firebaseConfig = {
//   apiKey: "AIzaSyCIW14oEHkNnDBuMCMkWqimR4Y5c2CJ8PI",
//   authDomain: "myreactapp-2ea4b.firebaseapp.com",
//   projectId: "myreactapp-2ea4b",
//   storageBucket: "myreactapp-2ea4b.firebasestorage.app",
//   messagingSenderId: "66413220288",
//   appId: "1:66413220288:web:7ff5fba533bee2a6f33825",
//   measurementId: "G-ZHRK1594BX"
// };

 const firebaseConfig = {
   apiKey: import.meta.env.VITE_apikey,
   authDomain: import.meta.env.VITE_authDomain,
   projectId: import.meta.env.VITE_projectId,
   storageBucket: import.meta.env.VITE_storageBucket,
   messagingSenderId: import.meta.env.VITE_messagingSenderId,
   appId: import.meta.env.VITE_VITE_appId,   
  measurementId: "G-ZHRK1594BX",
  databaseURL: import.meta.env.VITE_databaseURL,
 };



//firebase에 연결  후 앱 초기화
const app = initializeApp(firebaseConfig);
//사용자를 데이터베이스 인스턴스를 가져옵니다.
const firestore = getFirestore(app);
const realtime = getDatabase(app);
//익스포트 (내보내기)
export { firestore, realtime }
