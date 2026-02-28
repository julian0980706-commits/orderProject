import {  signInWithEmailAndPassword,onAuthStateChanged,signOut} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";//注意這裡引入的是auth url不是firestore
import{auth } from"./config.js";
//如果已經登入的話
onAuthStateChanged(auth,user=>{
            if(user){ //user一樣是隨便的參數
            console.log("登入成功")
            window.location.href="document.html"//如果已經登入直接跳轉
            }})
//取得使用者輸入
const login=async()=>{
    const login_account = document.getElementById("account").value
    const login_password=document.getElementById("password").value
    try{
        const userCredential=await signInWithEmailAndPassword(auth,login_account,login_password) //執行函式return物件(如果帳密存在)
        window.location.href="document.html"
    }
    catch(e){//帳密不存在
        alert("帳密不存在")
    }
    
}
let see =false
document.getElementById("seepassword").addEventListener("click",()=>{
    if(!see){
        see=true
        document.getElementById("password").type="text"
        document.getElementById("seepassword").innerText="🫢"
    }
    else{
        see=false
        document.getElementById("password").type="password"
        document.getElementById("seepassword").innerText="🫣"
    }
    
})
document.getElementById("signin").addEventListener("click",login)