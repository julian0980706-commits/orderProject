import { collection, getDocs ,query,orderBy,updateDoc,where } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "./config.js";
//準備一下firestore
const calendarRef=collection(db,"admin","calendar","calendar")
const days=document.getElementById("days")
const calendar=document.getElementById("calendar")
const nextmonth=document.getElementById("nextmonth")
const premonth=document.getElementById("premonth")
const smallTitle=document.getElementById("smallTitle")
//準備一下按鈕對應的連結 做成物件
const clickUrls={
    "小虎牛排":"forms/steak.html",
    "成功燒臘":"forms/spicy.html",
    "竇爸":"forms/beanDad.html",
    "火雞肉飯":"forms/turkey.html",
    "永樂燒肉飯":"forms/firemeat.html",
    "木鱉果牛肉麵":"forms/beefnoodles.html",
    "悟饕":"forms/lunchbox.html",
    "紅樓":"forms/redBuilding.html",
    "海南雞飯":"forms/southSeaChickenRice.html",
    "八方雲集":"forms/dumplings.html",
    "柴與咖哩":"forms/curry.html",
    "海苔飯捲":"forms/susi.html"
}
//先把要的集合拿出來
//loading animation
const animation =document.getElementById("animation")
animation.style.display="block"
let  all_docs
try{
    all_docs= await getDocs(calendarRef) 
}
catch(e){
    alert("網路不穩，請稍後再試")
}
animation.style.display="none"
document.getElementById("QA").style.display="block"
smallTitle.style.display="block"
calendar.style.display="table"
premonth.style.display="block"
nextmonth.style.display="block"
//關鍵!!!把data變成物件 id當成名字 data變成屬性
//這樣就是巢狀物件
const calendarData={}
all_docs.forEach((doc)=>{
   calendarData[doc.id]=doc.data();
})

//取得現在時間

let today=new Date()
console.log(today)
let year= today.getFullYear()
let month=today.getMonth() 
let nowMonth=month+1
let day=today.getDay() +1
let date=today.getDate()
const drawCalandar=()=>{
   monthdisplay.innerText=`${nowMonth}`
   //清空月曆
   days.innerHTML=``
   //這個月有幾天
   let howManyDaysInThisMonth= new Date(year,nowMonth,0).getDate()
   //空幾格 從星期天開始算
   let howManySpaceAheadInThisMonth=new Date(year,nowMonth-1,1).getDay()
   if (howManySpaceAheadInThisMonth>=7){
      howManySpaceAheadInThisMonth=0
   }
   console.log(howManySpaceAheadInThisMonth)
   //非常重要的變數 他代表表格化到了第幾格 畫到7時應該封閉<tr/>
   let nowNum=0
   //畫空格 (注意!!innerHtml不允許迴圈執行一次後有不完整的標籤)
   //所以要先用字串包innerhtml最後在一次+=innerhtml
   let  innerText=``   
   innerText+=`<tr>`
    for(let i=0;i<howManySpaceAheadInThisMonth;i++){
        innerText+=`
            <td></td>
        `
        nowNum+=1
    }
    
    for(let i=1;i<=howManyDaysInThisMonth;i++){
        if(nowNum>=7){
        innerText+=`<tr>`
        nowNum=0
        }
        //物件要先判斷有沒有屬性不然會報錯
        if(!calendarData[`${year}_${nowMonth}_${i}`]){
            innerText+=`<td id="day_${i}">${i}</td>`
        }
        else{
            let todayDisplay=calendarData[`${year}_${nowMonth}_${i}`][`index`]
            if(todayDisplay!="無"){
                //data-url就像一個在dataset裡的屬性 再放置事件監聽器時很好用(這裡代表在她的內建屬性dataset裡放屬性"url")
                innerText+=`<td data-url="${todayDisplay}"; id="day_${i}">${i}<br />${todayDisplay}</td>`
            }
            else{
                innerText+=`<td id="day_${i}">${i}</td>`
            }
        }
        nowNum+=1
        if(nowNum>=7){
            innerText+=`</tr>`
        }
        
    }
    
    if(nowNum!=7){
        innerText+=`</tr>`
    }
    days.innerHTML+=innerText
    //最後再加事件監聽器
    for(let i=1;i<=howManyDaysInThisMonth;i++){
        const doc= document.getElementById(`day_${i}`)
        if(doc["dataset"]["url"]){
            doc.addEventListener("click",()=>{
                let attribute=`${doc.dataset.url}`//先取得店家名稱
                window.location.href=`${clickUrls[attribute]}`//在取得對應網址
            })
        }
    }
    //標註當天
    if(nowMonth==month+1){
        const today= document.getElementById(`day_${date}`)
        today.style.backgroundColor="#E57373"
        today.style.fontWeight="bold"
        today.style.color="#FFFFFF"
    
    }
}
drawCalandar()
const qa=()=>{
    document.getElementById("dialog").showModal()
    localStorage.setItem("hasVisited", "true");
    document.getElementById("close").onclick=()=>{document.getElementById("dialog").close()}
}
let hasVisited = localStorage.getItem("hasVisited");
if(!hasVisited){
    qa()
}
document.getElementById("QA").onclick=qa


//改變月按鈕的邏輯
premonth.addEventListener("click",()=>{
    nowMonth-=1
    if(nowMonth<=0){
        nowMonth=12
    }
    drawCalandar()
    console.log(nowMonth)
    window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
    });
})
nextmonth.addEventListener("click",()=>{
    nowMonth+=1
    if(nowMonth>=13){
        nowMonth=1
    }
    drawCalandar()
    console.log(nowMonth)
    window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
    });
})
//變更月曆按鈕


