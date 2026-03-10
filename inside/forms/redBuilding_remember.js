import { getFirestore, collection, getDocs ,query,orderBy,updateDoc,where} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
//gatdocs取得資料 query orderBy排序資料用
import{db}from"./config.js"
let myNumber = localStorage.getItem("redBuilding");
const orderRef=collection(db,"forms","redBuilding","redBuilding")
const orderRef_bytime=query(orderRef,
    where("show","==",true),//判斷條件式從firebase拿符合條件的
    orderBy("time","asc"))//asc 從舊到新/小到大 dasc從新到舊/大到小
    const Myorder=query(orderRef,
        where("num","==",myNumber),
        where("show", "==", true),
    )
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
        const time=element.time
        //meal計數(注意要nested 電腦沒有那麼聰明)
        if(mealcounter[meal]){
            mealcounter[meal]+=1
        }
        else{
            mealcounter[meal]=1
        }
        //推送主表單
        table.innerHTML+=`
        <tr>
            <td>${num}</td>
            <td>${meal}</td>
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
    sum.innerHTML+=`
    <tr>
        <th>總數</th>
        <td>${i}份</td>
    </tr>`
    const qa=()=>{
        document.getElementById("dialog").showModal()
        localStorage.setItem("hasVisitedRemember", "true");
        document.getElementById("close").onclick=()=>{document.getElementById("dialog").close()}
    }
    let hasVisitedRemember = localStorage.getItem("hasVisitedRemember");
    if(!hasVisitedRemember){
        qa()
    }
    document.getElementById("QA").onclick=qa
    table.scrollIntoView({behavior:"smooth"});
    document.getElementById("deleteOrder").addEventListener("click",()=>{
        delarea.showModal()
        if(!myNumber){
            document.getElementById("ensureText").innerText=`目前系統尚未有你的紀錄!`
            document.getElementById("confirm").addEventListener("click",()=>{document.getElementById("delarea").close()})
            document.getElementById("cancel").style.display="none"
        }   
        else{
            document.getElementById("ensureText").innerText=`確定刪除座號為:"${myNumber}" 的所有訂單嗎`
            document.getElementById("cancel").addEventListener("click",()=>{document.getElementById("delarea").close()})
            document.getElementById("confirm").addEventListener("click",async()=>{
                let myOrders
                let myRefs=[]
                try{
                    myOrders= await getDocs(Myorder)
                }
                catch(e){
                    console.error(e); // 點開這個錯誤看裡面有沒有網址
                    alert("網路不穩，請稍後在試")
                }
                myOrders.forEach((element)=>{
                    myRefs.push(element.ref)
                })
                for(let d of myRefs){
                    await updateDoc(d, { show: false });
                }
                location.reload()
            
            })
        }
        })
}
getOrder()
