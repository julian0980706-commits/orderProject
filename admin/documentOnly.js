import { collection, updateDoc ,getDocs,query,orderBy,where} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "./config.js"

const table_area = document.getElementById("table_area")
const main_menu = document.getElementById("main-menu")
const deleteBtn = document.getElementById("delete") // 抓取刪除按鈕
const delarea=document.getElementById("delarea")
const confirm=document.getElementById("confirm")
const cancel=document.getElementById("cancel")

//刪除用陣列
let deldata=[]

const reset=()=>{
    deldata=[]
    main_menu.style.paddingTop = "0px";
    main_menu.style.minHeight = "auto"; 
    window.scrollTo({ top: 0, behavior: 'smooth' });
    table_area.style.display = "flex";
    main_menu.style.display = "none";
    deleteBtn.style.display = "none"; // 確保切換店家時先隱藏
}
//刪除函式
deleteBtn.addEventListener("click",async()=>{
    delarea.showModal()
    cancel.addEventListener("click",()=>{delarea.close()})
    confirm.addEventListener("click",async()=>{
        for(let docRef of deldata){//一樣用await all_order現在是一個(似)陣列(但不能迭帶)(但是複雜的方式寫的陣列)
            await updateDoc(docRef,{show:false})
        }
        console.log("complete!!!")
        delarea.close()
        location.reload()
    })
})

const b = ["spicy", "curry" ,"lunchbox", "beanDad", "susi" ,"redBuilding","beefnoodles"]
const B = ["成功燒臘", "柴與咖哩", "悟饕", "竇爸", "岩海苔飯捲", "紅樓","木鱉果牛肉麵"]
const c = ["southSeaChickenRice", "turkey", "firemeat"]
const C = ["海南雞飯", "火雞肉飯", "永樂燒肉飯"]

b.forEach((store, index) => {
    document.getElementById(store).addEventListener("click", async () => {
        reset()
        table_area.innerHTML = `<div id="form_area" style="width: 100%;">
        <h1 style="justify-self: center;">${B[index]}</h1>
            <table id="table">
                <thead>
                    <tr>
                    <th>座號</th>
                    <th>餐點</th>
                    <th>時間</th>
                    </tr>
                </thead>    
                <tbody id="tb">
                </tbody>
            </table>
        </div>`
        const docRef = collection(db, "forms", store, store)
        let docRef_1 = query(docRef, orderBy("time", "asc"),where("show","==",false))
        let docs
        try {
            docs = await getDocs(docRef_1)
        } catch(e) {
            alert("網路不穩，請稍後再試")
        }
        let text = ``
        docs.forEach(element => {
            text += `
            <tr>
                <td>${element.data().num}</td>
                <td>${element.data().meal}</td>
                <td>${element.data().time.toDate().toLocaleString('zh-TW', { 
                    hour12: false,
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'})}
                </td>
            </tr>`
        });        
        let docRef_2 = query(docRef, orderBy("time", "asc"),where("show","==",true))
        try {
            docs = await getDocs(docRef_2)
        } catch(e) {
            alert("網路不穩，請稍後再試")
        }
        docs.forEach(element => {
            deldata.push(element.ref);
            text += `
            <tr>
                <td class="t">${element.data().num}</td>
                <td class="t">${element.data().meal}</td>
                <td class="t">${element.data().time.toDate().toLocaleString('zh-TW', { 
                    hour12: false,
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'})}
                </td>
            </tr>`
        });        
        document.getElementById("tb").innerHTML = text
        deleteBtn.style.display = "block";
    })
})

c.forEach((store, index) => {
    document.getElementById(store).addEventListener("click", async () => {
        reset()
        table_area.innerHTML = `<div id="form_area" style="width: 100%;">
        <h1 style="justify-self: center;">${C[index]}</h1>
            <table id="table">
                <thead>
                    <tr>
                    <th>座號</th>
                    <th>餐點</th>
                    <th>加點</th>
                    <th>時間</th>
                    </tr>
                </thead>    
                <tbody id="tb">
                </tbody>
            </table>
        </div>`
        const docRef = collection(db, "forms", store, store)
        let docRef_1 = query(docRef, orderBy("time", "asc"),where("show","==",false))
        let docs
        try {
            docs = await getDocs(docRef_1)
        } catch(e) {
            alert("網路不穩，請稍後再試")
        }
        let text = ``
        docs.forEach(element => {
            text += `
            <tr>
                <td>${element.data().num}</td>
                <td>${element.data().meal}</td>
                <td>${element.data().extra}</td>
                <td>${element.data().time.toDate().toLocaleString('zh-TW', { 
                    hour12: false,
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'})}
                </td>
            </tr>`
        });       
        let docRef_2 = query(docRef, orderBy("time", "asc"),where("show","==",true))
        try {
            docs = await getDocs(docRef_2)
        } catch(e) {
            alert("網路不穩，請稍後再試")
        }
        docs.forEach(element => {
            deldata.push(element.ref);
            text += `
            <tr>
                <td class="t">${element.data().num}</td>
                <td class="t">${element.data().meal}</td>
                <td class="t">${element.data().extra}</td>
                <td class="t">${element.data().time.toDate().toLocaleString('zh-TW', { 
                    hour12: false,
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'})}
                </td>
            </tr>`
        }); 
        document.getElementById("tb").innerHTML = text
        deleteBtn.style.display = "block";
    })
})

document.getElementById("steak").addEventListener("click", async () => {
    reset()
    table_area.innerHTML = `<div id="form_area" style="width: 100%;">
    <h1 style="justify-self: center;">小虎牛排</h1>
        <table id="table">
            <thead>
                <tr>
                <th>座號</th>
                <th>主餐</th>
                <th>附餐</th>
                <th>時間</th>
                </tr>
            </thead>    
            <tbody id="tb">
            </tbody>
        </table>
    </div>`
    const docRef = collection(db, "forms", "steak", "steak")
    let docRef_1 = query(docRef, orderBy("time", "asc"),where("show","==",false))
    let docs
    try {
        docs = await getDocs(docRef_1)
    } catch(e) {
        alert("網路不穩，請稍後再試")
    }
    let text = ``
    docs.forEach(element => {
        text += `
        <tr>
            <td>${element.data().num}</td>
            <td>${element.data().sauce + element.data().meal}</td>
            <td>${element.data().sidedish}</td>
            <td>${element.data().time.toDate().toLocaleString('zh-TW', { 
                hour12: false,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'})}
            </td>
        </tr>`
    }); 
    let docRef_2 = query(docRef, orderBy("time", "asc"),where("show","==",true))
    try {
        docs = await getDocs(docRef_2)
    } catch(e) {
        alert("網路不穩，請稍後再試")
    }
    docs.forEach(element => {
        deldata.push(element.ref);
        text += `
        <tr>
            <td class="t">${element.data().num}</td>
            <td class="t">${element.data().sauce + element.data().meal}</td>
            <td class="t">${element.data().sidedish}</td>
            <td class="t">${element.data().time.toDate().toLocaleString('zh-TW', { 
                hour12: false,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'})}
            </td>
        </tr>`
    });        
    document.getElementById("tb").innerHTML = text   
    deleteBtn.style.display = "block";     
})

document.getElementById("dumplings").addEventListener("click", async () => {
    reset()
    table_area.innerHTML = `<div id="form_area" style="width: 100%;">
    <h1 style="justify-self: center;">八方雲集</h1>
        <table id="table">
            <thead>
                <tr>
                <th>座號</th>
                <th>餐點</th>
                <th>其他</th>
                <th>時間</th>
                </tr>
            </thead>    
            <tbody id="tb">
            </tbody>
        </table>
    </div>`
    const docRef = collection(db, "forms", "dumplings", "dumplings")
    let docRef_1 = query(docRef, orderBy("time", "asc"),where("show","==",false))
    let docs
    try {
        docs = await getDocs(docRef_1)
    } catch(e) {
        alert("網路不穩，請稍後再試")
    }
    let text = ``
    docs.forEach(element => {
        if(element.data().meal){
            text += `
            <tr>
                <td>${element.data().num}</td>
                <td>${element.data().sidedish + element.data().meal+element.data().howMany}顆</td>
                <td>${element.data().extra}</td>
                <td>${element.data().time.toDate().toLocaleString('zh-TW', { 
                    hour12: false,
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'})}
                </td>
            </tr>`
        }
        else{
            text += `
            <tr>
                <td>${element.data().num}</td>
                <td></td>
                <td>${element.data().extra}</td>
                <td>${element.data().time.toDate().toLocaleString('zh-TW', { 
                    hour12: false,
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'})}
                </td>
            </tr>`
        }
    });  
    let docRef_2 = query(docRef, orderBy("time", "asc"),where("show","==",true))
    try {
        docs = await getDocs(docRef_2)
    } catch(e) {
        alert("網路不穩，請稍後再試")
    }        
    docs.forEach(element => {
        deldata.push(element.ref);
        if(element.data().meal){
            text += `
            <tr>
                <td class="t">${element.data().num}</td>
                <td class="t">${element.data().sidedish + element.data().meal+element.data().howMany}顆</td>
                <td class="t">${element.data().extra}</td>
                <td class="t">${element.data().time.toDate().toLocaleString('zh-TW', { 
                    hour12: false,
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'})}
                </td>
            </tr>`
        }
        else{
            text += `
            <tr>
                <td class="t">${element.data().num}</td>
                <td class="t"></td>
                <td class="t">${element.data().extra}</td>
                <td class="t">${element.data().time.toDate().toLocaleString('zh-TW', { 
                    hour12: false,
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'})}
                </td>
            </tr>`
        }
    });  
    document.getElementById("tb").innerHTML = text        
    deleteBtn.style.display = "block";
})