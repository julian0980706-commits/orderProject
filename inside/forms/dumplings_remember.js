import {  collection, getDocs ,query,orderBy,updateDoc,where,doc,getDoc} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
//gatdocs取得資料 query orderBy排序資料用
import{db}from"./config.js"
let myNumber = localStorage.getItem("dumplings");
const orderRef=collection(db,"forms","dumplings","dumplings",)
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
    let ifShow
    try{
        ifShow= await getDoc(doc(db,"forms","dumplings"))
    }
    catch(e){
        console.error(e); // 點開這個錯誤看裡面有沒有網址
        alert("網路不穩，請稍後在試")
    }
    console.log(ifShow)
    if(ifShow.data().show!=true){
        document.getElementById("QA").style.display="none"
        document.getElementById("deleteOrder").style.display="none"
    }
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
    const extracounter={}
    order_array.forEach((element)=>{
        //把複雜時間美化
        element.time=element.time.toDate().toLocaleString('zh-TW', { 
        hour12: false, //12時制falese
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
        });
        const num=element.num
        const meal =element.meal
        const sidedish=element.sidedish
        const howMany=element.howMany
        const extra=element.extra
        const time=element.time
        //meal計數(注意要nested 電腦沒有那麼聰明)
        if(mealcounter[sidedish]){
            if(mealcounter[sidedish][meal.replace(/\d/g, "")]){
                if(mealcounter[sidedish][meal.replace(/\d/g, "")][howMany.replace(/\D/g, "")]){
                    mealcounter[sidedish][meal.replace(/\d/g, "")][howMany.replace(/\D/g, "")]+=1
                }
                else{
                    mealcounter[sidedish][meal.replace(/\d/g, "")][howMany.replace(/\D/g, "")]=1
                }
            }
            else{
                mealcounter[sidedish][meal.replace(/\d/g, "")]={}
                mealcounter[sidedish][meal.replace(/\d/g, "")][howMany.replace(/\D/g, "")]=1
            }
        }
        else{
            mealcounter[sidedish]={}
            mealcounter[sidedish][meal.replace(/\d/g, "")]={}
            mealcounter[sidedish][meal.replace(/\d/g, "")][howMany.replace(/\D/g, "")]=1
        }
        //extraCount
        if(extra){
            if(extracounter[extra]){
                extracounter[extra]+=1
            }
            else{
                extracounter[extra]=1
            }
        }
        //推送主表單
        if(element.only){
            table.innerHTML+=`
        <tr>
            <td>${num}</td>
            <td></td>
            <td>${extra}</td>
            <td></td>
            <td>${time}</td>
        </tr>`
        }
        else{
            table.innerHTML+=`
        <tr>
            <td>${num}</td>
            <td>${element.meal.replace(/\d/g, "")+element.sidedish+element.howMany}顆</td>
            <td>${extra}</td>
            <td>${+element.meal.replace(/\D/g, "")*+element.howMany.replace(/\D/g, "")}</td>
            <td>${time}</td>
        </tr>`
        }
        
    })
    for(let name in mealcounter){//注意!for in只會跑一層index
        for(let insid_name in mealcounter[name]){
           for(let insid_inside_name in mealcounter[name][insid_name]){
            sum.innerHTML+=`
            <tr>
                <th>${insid_name+name+insid_inside_name}顆</th>
                <td>${mealcounter[name][insid_name][insid_inside_name]}份</td>
            </tr>
            `
           } 
        }
    }
    for(let name in extracounter){
        sum.innerHTML+=`
        <tr>
            <th>${name}</th>
            <td>${extracounter[name]}份</td>
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

