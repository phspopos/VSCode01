//파이어베이스 서비스에 연결하기 위한 임포트
import { initializeApp } from "firebase/app";
//storage 임포트
import { getStorage } from "firebase/storage";

//env 파일 생성 후
 const firebaseConfig = {
   apiKey: import.meta.env.VITE_apikey,
   authDomain: import.meta.env.VITE_authDomain,
   projectId: import.meta.env.VITE_projectId,
   storageBucket: import.meta.env.VITE_storageBucket,
   messagingSenderId: import.meta.env.VITE_messagingSenderId,
   appId: import.meta.env.VITE_VITE_appId,   
  measurementId: "G-ZHRK1594BX"
 };

//App 초기화
const app = initializeApp(firebaseConfig);
//storage 객체 생성(본인의 스토리지 gs주소 사용)
const storage = getStorage(app, "");
//익스포트
export { storage }
