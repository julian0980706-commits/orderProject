// 1. 從 Firebase 網址裡，拿出「初始化」和「資料庫」這兩樣工具
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
//這裡拿getdocs拿取資料
import { getFirestore, collection, getDocs ,query,orderBy,updateDoc,where} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
//gatdocs取得資料 query orderBy排序資料用
const firebaseConfig = {
  apiKey: "AIzaSyAi09ke5VrH4CDcxqN5bU6qKzAP917lvT4",
  authDomain: "order-9430b.firebaseapp.com",
  projectId: "order-9430b",
  storageBucket: "order-9430b.firebasestorage.app",
  messagingSenderId: "588632747827",
  appId: "1:588632747827:web:abdd640ca670b0cca4d846",
  measurementId: "G-KTP9BS35MM"
};
//在資料庫將函式表示為const 變數 是為了讓他不會被重新賦值 且以後寫法較簡便
// 3. 正式啟動 Firebase
const app = initializeApp(firebaseConfig);
//注意!!const函式只是在做字的替換而已 且const的過程中若有出現()則立即執行該函式
// 4. 取得資料庫的控制權，我們叫它 db(database)
const db = getFirestore(app);

//(集合,文件,集合)
//連接到firebase的表格的選定項目
const orderRef=collection(db,"forms","steak","steak",)
const orderRef_bytime=query(orderRef,
    where("show","==",true),//判斷條件式從firebase拿符合條件的
    orderBy("time","asc"))//asc 從舊到新/小到大 dasc從新到舊/大到小
const table =document.getElementById("table")
const sum =document.getElementById("sum")
//取得表單資料(非同步async函式)
let i=0 //先搞個訂單數量變數
async function getOrder(){
  let all_orders //一樣用await all_order現在是一個(似)陣列(但是複雜的方式寫的陣列)
  const form_area=document.getElementById("form_area")
  form_area.style.display="none"
  const animation=document.getElementById("animation")
  animation.style.display="block"  
  try{
    all_orders= await getDocs(orderRef_bytime)
  }
  catch(e){
    alert("網路不穩，請稍後在試")
  }
  animation.style.display="none"
  form_area.style.display="block"
  const order_array =[]//放總定單的資料
  all_orders.forEach((doc)=>{
    order_array.push(doc.data()) //doc.data()是把複雜陣列改成我們看得懂的
    i+=1
  })
  const mealcounter ={}
  const sidedishcounter={}
  order_array.forEach((element)=>{
    //把複雜時間美化
    element.time=element.time.toDate().toLocaleString('zh-TW', { 
    hour12: false, //12時制falese
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
    });
    const num=element.num
    const meal =element.meal
    const sauce=element.sauce
    const sidedish=element.sidedish
    const time=element.time
    //meal計數(注意要nested 電腦沒有那麼聰明)
    if(mealcounter[meal]){
        if(mealcounter[meal][sauce]){
            mealcounter[meal][sauce]+=1
        }
        else{
            mealcounter[meal][sauce]=1
        }
    }
    else{
        mealcounter[meal]={}
        mealcounter[meal][sauce]=1
    }
    //sidedish計數
    if(sidedishcounter[sidedish]){
        sidedishcounter[sidedish]+=1
    }
    else{
        sidedishcounter[sidedish]=1
    }
    //推送主表單
    table.innerHTML+=`
    <tr>
        <td>${num}</td>
        <td>${sauce+meal}</td>
        <td>${sidedish}</td>
        <td>${time}</td>
    </tr>`
  })
 for(let name in mealcounter){//注意!for in只會跑一層index
   for(let insid_name in mealcounter[name]){
    sum.innerHTML+=`
    <tr>
        <th>${name+insid_name}</th>
        <td>${mealcounter[name][insid_name]}個</td>
    </tr>`
   }
 }
 for(let name in sidedishcounter){
    sum.innerHTML+=`
    <tr>
        <th>${name}</th>
        <td>${sidedishcounter[name]}個</td>
    </tr>`
 }
 sum.innerHTML+=`
 <tr>
    <th>總數</th>
    <td>${i}份</td>
 </tr>`
 del.addEventListener("click",async()=>{
    delarea.showModal()
    cancel.addEventListener("click",()=>{delarea.close()})
    confirm.addEventListener("click",async()=>{
        for(let doc of all_orders.docs){//一樣用await all_order現在是一個(似)陣列(但不能迭帶)(但是複雜的方式寫的陣列)
            await updateDoc(doc.ref,{show:false})
            table.style.display="none"
            sum.style.display="none"
            console.log("complete!!!")
            delarea.close()
        }
        })
    
    })
}  
const confirm=document.getElementById("confirm")
const cancel=document.getElementById("cancel")
const del =document.getElementById("delete")
const delarea=document.getElementById("delarea")
getOrder()
