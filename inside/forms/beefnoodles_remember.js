import { getFirestore, collection, getDocs ,query,orderBy,updateDoc,where} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
//gatdocs取得資料 query orderBy排序資料用
import{db}from"./config.js"
const orderRef=collection(db,"forms","beefnoodles","beefnoodles")
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
        console.error(e); // 點開這個錯誤看裡面有沒有網址
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
    const extracounter={}
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
        const extra=element.extra
        const num=element.num
        const meal =element.meal
        const time=element.time
        //extra計數
        if(extra){
            if(extracounter[extra]){
                extracounter[extra]+=1
            }
            else{
                extracounter[extra]=1
            }
        }
        //meal計數(注意要nested 電腦沒有那麼聰明)
        if(mealcounter[meal.replace(/\d/g, "")]){
            mealcounter[meal.replace(/\d/g, "")]+=1
        }
        else{
            mealcounter[meal.replace(/\d/g, "")]=1
        }
        //推送主表單
        table.innerHTML+=`
        <tr>
            <td>${num}</td>
            <td>${meal}</td>
            <td>${extra}</td>
            <td>${time}</td>
        </tr>`
    })
    for(let name in mealcounter){//注意!for in只會跑一層index
        sum.innerHTML+=
        `<tr>
            <th>${name}</th>
            <td>${mealcounter[name]}個</td>
        </tr>`
    }
    for(let name in extracounter){
        sum.innerHTML+=`
        <tr>
        <th>${name}</th>
        <td>${extracounter[name]}個</td>
        </tr>`
    }
    sum.innerHTML+=`
    <tr>
        <th>總數</th>
        <td>${i}份</td>
    </tr>`
}
getOrder()
