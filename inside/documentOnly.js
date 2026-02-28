import { collection, updateDoc ,getDocs,query,orderBy} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "./config.js"

const table_area = document.getElementById("table_area")
const main_menu = document.getElementById("main-menu")
const docu=document.getElementById("document")
const b = ["spicy", "curry" ,"lunchbox", "beanDad", "susi" ,"redBuilding","beefnoodles"]
const B = ["成功燒臘", "柴與咖哩", "悟饕", "竇爸", "岩海苔飯捲", "紅樓","木鱉果牛肉麵"]
const c = ["southSeaChickenRice", "turkey", "firemeat"]
const C = ["海南雞飯", "火雞肉飯", "永樂燒肉飯"]
const reSet=()=>{
    docu.innerText="⬅️返回"
    docu.style.height="60px"
    docu.style.width="100px"
    docu.style.backgroundColor="rgba(112, 112, 244, 0.886)"
    docu.style.borderRadius="5px"
}
b.forEach((store, index) => {
    document.getElementById(store).addEventListener("click", async () => {
        reSet()
        main_menu.style.paddingTop = "0px";
        main_menu.style.minHeight = "auto"; 
        table_area.style.display = "flex"
        main_menu.style.display = "none"
        table_area.innerHTML = `<div id="form_area" style="width: 100%;">
        <h1 style="text-align: center;">${B[index]}</h1>
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
        let docRef = collection(db, "forms", store, store)
        docRef = query(docRef, orderBy("time", "asc"))
        let docs
        try {
            docs = await getDocs(docRef)
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
        document.getElementById("tb").innerHTML = text
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    })
})

c.forEach((store, index) => {
    document.getElementById(store).addEventListener("click", async () => {
        reSet()
        main_menu.style.paddingTop = "0px";
        main_menu.style.minHeight = "auto"; 
        table_area.style.display = "flex"
        main_menu.style.display = "none"
        table_area.innerHTML = `<div id="form_area" style="width: 100%;">
        <h1 style="text-align: center;">${C[index]}</h1>
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
        let docRef = collection(db, "forms", store, store)
        docRef = query(docRef, orderBy("time", "asc"))
        let docs
        try {
            docs = await getDocs(docRef)
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
        document.getElementById("tb").innerHTML = text
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    })
})

document.getElementById("steak").addEventListener("click", async () => {
    reSet()
    main_menu.style.paddingTop = "0px";
    main_menu.style.minHeight = "auto"; 
    table_area.style.display = "flex"
    main_menu.style.display = "none"

    table_area.innerHTML = `<div id="form_area" style="width: 100%;">
    <h1 style="text-align: center;">小虎牛排</h1>
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
    let docRef = collection(db, "forms", "steak", "steak")
    docRef = query(docRef, orderBy("time", "asc"))
    let docs
    try {
        docs = await getDocs(docRef)
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
    document.getElementById("tb").innerHTML = text    
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });    
})

document.getElementById("dumplings").addEventListener("click", async () => {
    reSet()
    main_menu.style.paddingTop = "0px";
    main_menu.style.minHeight = "auto"; 
    table_area.style.display = "flex"
    main_menu.style.display = "none"

    table_area.innerHTML = `<div id="form_area" style="width: 100%;">
    <h1 style="text-align: center;">八方雲集</h1>
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
    let docRef = collection(db, "forms", "dumplings", "dumplings")
    docRef = query(docRef, orderBy("time", "asc"))
    let docs
    try {
        docs = await getDocs(docRef)
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
    document.getElementById("tb").innerHTML = text        
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
})