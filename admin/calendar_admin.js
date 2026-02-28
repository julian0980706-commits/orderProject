//new Date()函式能傳下一個記錄當下時間的複雜物件
//new Date()可以傳入三個數字 (年月日) 年月日可為0也可為負也可大於上限，會自動計算(倒退或往後)
//js裡的月 或是星期都是從0開始
//物件裡的methods
/**
 *  功能    語法範例            結果說明
    拿今年,date.getFullYear(),  例如 2026
    拿當月,date.getMonth(),     0 ~ 11 (要記得 +1 才是人類看的月份)
    拿當日,date.getDate(),      1 ~ 31
    拿星期幾,date.getDay(),     0 (週日) ~ 6 (週六)
    輸入0得到上一個月的最後一天可以計算那個月有幾天
 */
//.padStart(2, "0")
import { collection, getDocs ,query,orderBy,updateDoc,where,doc,setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "./config.js";
//準備一下firestore
const calendarRef=collection(db,"admin","calendar","calendar")
//先把要的集合拿出來
const all_docs= await getDocs(calendarRef)
//關鍵!!!把data變成物件 id當成名字 data變成屬性
//這樣就是巢狀物件
const calendarData={}
all_docs.forEach((doc)=>{
   calendarData[doc.id]=doc.data();
})
//取得一些按鈕
const delarea=document.getElementById("delarea")
const cancel=document.getElementById("cancel")
const confirm=document.getElementById("confirm")
const monthdisplay=document.getElementById("monthdisplay")
const nextmonth=document.getElementById("nextmonth")
const premonth=document.getElementById("premonth")
const commit=document.getElementById("commit")
//取得現在時間
const days=document.getElementById("days")
let today=new Date()
console.log(today)
let year= today.getFullYear()
let month=today.getMonth() 
let nowMonth=month+1
let day=today.getDay() +1
let date=today.getDate()
//畫(某個月的)月曆函式
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
      //每天都加一個下拉式選單
      let choices=`<select id="select_${i}" style="width:45px ;height:30px">
                     <option value="無">無</option>
                     <option value="小虎牛排">小虎牛排</option>
                     <option value="成功燒臘">成功燒臘</option>
                     <option value="海苔飯捲">海苔飯捲</option>
                     <option value="柴與咖哩">柴與咖哩</option>
                     <option value="木鱉果牛肉麵">木鱉果牛肉麵</option>
                     <option value="海南雞飯">海南雞飯</option>
                     <option value="竇爸">竇爸</option>
                     <option value="悟饕">悟饕</option>
                     <option value="火雞肉飯">火雞肉飯</option>
                     <option value="永樂燒肉飯">永樂燒肉飯</option>
                     <option value="紅樓">紅樓</option>
                     <option value="八方雲集">八方雲集</option>
                     </select>  `
      
      if(nowNum>=7){
            innerText+=`<tr>`
         nowNum=0
      }
         innerText+=`
         <td>${i}${choices}</td>`
      nowNum+=1
      if(nowNum>=7){
         innerText+=`</tr>`
      }
   }
   if(nowNum!=7){
      innerText+=`</tr>`
   }
   days.innerHTML+=innerText
   //畫完再更新月曆
   for(let i=1 ;i<=howManyDaysInThisMonth;i++){
      if(calendarData[`${year}_${nowMonth}_${i}`]){//如果有要顯示的(物件有這個屬性(ID))
         document.getElementById(`select_${i}`).value = calendarData[`${year}_${nowMonth}_${i}`]["index"]
      }
   }
}

drawCalandar()
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
      behavior: "smooth" // 平滑滾動的關鍵
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
      behavior: "smooth" // 平滑滾動的關鍵
   });
})
//變更月曆按鈕

//以下是新增指定id文件固定寫法
//target_doc= doc(calendarRef, "自定義ID")
//setDoc(target_doc,{})
commit.addEventListener("click",async()=>{
   delarea.showModal()
   cancel.addEventListener("click",()=>{delarea.close()})
   confirm.addEventListener("click",async()=>{
      const calendarIdArray=[]
      //把每個id加到陣列裡
      all_docs.forEach((doc)=>{
         calendarIdArray.push(doc.id)
      })
      //先來抓當月
      //先建立一個物件存放當月的東西
      const monthData={}
      //每天的選項放進物件裡
      let howManyDaysInThisMonth= new Date(year,nowMonth,0).getDate()
      for(let i=1;i<=howManyDaysInThisMonth;i++){
         monthData[`${year}_${nowMonth}_${i}`]=document.querySelector(`#select_${i}`).value
      }
      for(let index in monthData){
         
         let  target_doc= doc(calendarRef, `${index}`)
         let hasId=calendarIdArray.includes(`${index}`)//回傳陣列是否有這一項true /false
         if(!hasId){
            if(monthData[index]!="無"){ //如果從來都沒有建立過就不要建立了
               await setDoc(target_doc,{index:`${monthData[index]}`})
            }
         }
         else{
            await   updateDoc(target_doc,{index:`${monthData[index]}`})
         }
         
      }
      
   console.log("complete")
   delarea.close()   
   location.reload()
   })
    
})