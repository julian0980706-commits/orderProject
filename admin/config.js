//一些引入的東西
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth ,signInWithEmailAndPassword,onAuthStateChanged,signOut,} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";//注意這裡引入的是auth url不是firestore
import {getFirestore, } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyAi09ke5VrH4CDcxqN5bU6qKzAP917lvT4",
  authDomain: "order-9430b.firebaseapp.com",
  projectId: "order-9430b",
  storageBucket: "order-9430b.firebasestorage.app",
  messagingSenderId: "588632747827",
  appId: "1:588632747827:web:abdd640ca670b0cca4d846",
  measurementId: "G-KTP9BS35MM"
};
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app) //輸出一個變數 可惜不能export import的東西
export const auth=getAuth(app) //輸出一個變數
//一些可以用的函式

//檢查使用者登入狀態
//這個高階函式很特別，他可以監控任何使用者登入有改變的情況
export const checkUser=async()=>{ 
        onAuthStateChanged(auth,user=>{
            if(user){ //user一樣是隨便的參數
            console.log("登入成功")
            document.body.style.display="block" //登入才顯示畫面
        }
        else{
            alert("你已登出即將轉回主頁")
            window.location.href = "index.html"; 
        }
        })
        
}
//登出函式
export const logOut=()=>{
    document.body.innerHTML+=`
    <dialog id="logOutArea"><!--特殊容器標籤 能夠獨立視窗 防止後面被點擊 預設display:none-->
            <div style="height: 20px; margin: 0; text-align: center;">
                <h2 style="font-size: 25px;margin: 0; position: relative;bottom: 7px;">確定登出?</h2>
            </div>
            <div id="flexarea_lo">
                <button id="cancel_lo">取消</button>
                <button id="confirm_lo">確定</button>
            </div>      
    </dialog>`
    const cancel_lo=document.getElementById("cancel_lo")
    const confirm_lo=document.getElementById("confirm_lo")
    const logOutArea=document.getElementById("logOutArea")
    const logout =document.getElementById("logOut")
    logout.addEventListener("click",async()=>{
    logOutArea.showModal()
    cancel_lo.addEventListener("click",()=>{logOutArea.close()})
    confirm_lo.addEventListener("click",async()=>{
        await  signOut(auth)
        window.location.href = "index.html"; 
    })
    })}