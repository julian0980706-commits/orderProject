import {  signInWithEmailAndPassword,onAuthStateChanged,signOut,} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import{auth, logOut } from"./config.js";
import { checkUser } from "./config.js";// 這是一個「守門員」，它會自動檢查目前的使用者狀態
checkUser()
logOut()
//底部導覽列
let box = document.getElementsByClassName("box");
const urls = ["document.html", "calendar_admin.html","canWrite.html","todayForm.html"];
for(let i = 0; i <urls.length; i++) {
    box[i].addEventListener("click",function(){ 
    window.location.href=urls[i] //跳轉頁面
    });
}

