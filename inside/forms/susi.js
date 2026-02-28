import {  collection, addDoc,getDoc ,doc} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import{db} from "./config.js"
//確認是否顯示 拿取單一文件(getdoc)
const docRef=doc(db,"forms","susi")
let ifShow
//loading
const animation_loading=document.getElementById("animation_loading")
document.body.style.background = "white";
animation_loading.style.display="block"
try{
    ifShow= await getDoc(docRef)
}
catch(e){
    alert("網路不穩，請稍後再試")
}
animation_loading.style.display = "none";
animation_loading.style.display="none"
const main=document.getElementById("main")
ifShow=ifShow.data()
if(ifShow.show==true){
    document.body.style.display="block"
    document.body.style.background = "linear-gradient(135deg, #1e3799 0%, #000000 100%)";
    document.body.style.backgroundAttachment = "fixed"; 
    main.style.display="block"
    //取得restart
    const restart=document.getElementById("restart")
    const animation=document.getElementById("animation")
    //取得紅字區
    const extra_area=document.getElementById("extra")
    const emeal =document.getElementById("emeal")
    const error_num=document.getElementById("enum")
    const error_input=document.getElementsByClassName("e")
    const error_deal=()=>{
        for(let i=0 ;i<error_input.length;i++){
            error_input[i].style.display="none"
        }
    }
    //取得area
    extra_area.addEventListener("input",error_deal)
    const text_area=document.getElementById("text")
    text_area.addEventListener("input",error_deal)

    //
    const orderRef=collection(db,"forms","susi","susi",)
    const myForm=document.getElementById("form")
    const submit_btn=document.getElementById("sub")
    const handleSubmit=async(e)=>{
        e.preventDefault(); //使網站不執行預設動作 (使他不refresh得以先執行函式內的動作)
        const num =document.querySelector('#text').value
        const meal=document.querySelector('#extra').value
        //確認使用者輸入
        if(!num){
            error_deal()
            error_num.style.display="block"
            error_num.scrollIntoView({behavior:"smooth"})//滾動到那裏(smoothly)
            return;
        }
        if(!meal){
            error_deal()
            emeal.style.display="block"
            emeal.scrollIntoView({behavior:"smooth"})//滾動到那裏(smoothly)
            return;
        }
        //準備傳送(建立物件)
        const total={
            num:num,
            meal:meal,
            time:new Date(),
            show:true
        }
        //嘗試傳送
        try{
            const container = document.getElementById("container");
            container.style.pointerEvents = "none"; 
            container.style.opacity = "0.5"
            submit_btn.disabled=true
            restart.disabled=true
            submit_btn.innerText="傳送中"
            await addDoc(orderRef,total)
            //傳完才執行下面
            submit_btn.innerText="送出訂單"
            main.style.display="none"
            animation.style.display="flex"
            animation.style.display="flex"
            container.style.display="none"
            setTimeout(()=>{window.location.href="susi_remember.html"},1200)
        }
        catch(error){
            alert("嗚嗚嗚，錯了")
            location.reload()
        }
    }
    myForm.addEventListener("submit",handleSubmit)
}
else {
    // 讓 main 容器全螢幕置中
    main.style.display = "flex";
    main.style.flexDirection = "column";
    main.style.justifyContent = "center";
    main.style.alignItems = "center";
    main.style.height = "100vh";

    // 插入美化後的卡片
    main.innerHTML = `
        <div style="background: rgba(255, 255, 255, 0.95); padding: 40px 30px; border-radius: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.4); text-align: center; width: 85%; max-width: 350px; border-top: 10px solid #eb2f06; font-family: sans-serif;">
            <div style="font-size: 60px; margin-bottom: 10px;">🕒</div>
            <h2 style="color: #2d3436; margin: 10px 0; font-size: 26px; font-weight: 900;">已經太遲了:(</h2>
            <p style="color: #636e72; margin: 0; font-size: 18px; line-height: 1.6;">
                <span style="color: #eb2f06; font-weight: bold; font-size: 20px;">表單已停止接受回覆</span>
            </p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            <button onclick="window.location.href='../index.html'"  style="width: 100%; padding: 12px; background: #eb2f06; color: white; border: none; border-radius: 12px; font-size: 16px; font-weight: bold; cursor: pointer;">返回主頁</button>
        </div>
    `;
}
console.log(ifShow.show)
window.addEventListener('pageshow', function (event) {
    // persisted 為 true 代表頁面是從快取（上一頁）回來的
    // 或者檢查 navigation type 是否為 2 (代表後退)
    if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
        // 發現是回上一頁，直接「強制重整」
        window.location.reload();
    }
});


