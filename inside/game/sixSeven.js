//管內容的放div
let row_1=document.getElementsByClassName("first")
let row_2=document.getElementsByClassName("second")
let row_3=document.getElementsByClassName("third")
let row_4=document.getElementsByClassName("fourth")
let row_5=document.getElementsByClassName("fifth")
let randomRows=[row_1,row_2,row_3,row_4,row_5]
//管位置的，放位置
let rnum1=[]
let rnum2=[]
let rnum3=[]
let rnum4=[]
let rnum5=[]
let allRows=[rnum1,rnum2,rnum3,rnum4,rnum5]//二維陣列

const clickRandom=()=>{
    let j=0
    //複製一個陣列(不能直接array1=array2這樣會使兩個array連通)
    const copyAllRows=[]
    for(let i=0;i<allRows.length;i++){
        copyAllRows.push(allRows[i])
    }
    //紀錄上一排移下來
    for(let i=1;i<allRows.length;i++){
        allRows[i]=copyAllRows[i-1]
    }
    //隨機第一個
    let randomnum=[0,1,2,3]
    randomnum.splice(Math.floor(Math.random()*4),1)
    randomnum.splice(Math.floor(Math.random()*3),1)
    rnum1=randomnum
    //畫出來
    for(element of randomRows){
        for(let i=0;i<4;i++){
            element[i].innerText=""
        }
        if(j==4){
            //拔監聽器
            for(let k=0;k<4;k++){
                element[k].removeEventListener("click",clickRandom)
            }
            element[allRows[j][1]].addEventListener("click",clickRandom)
        }//移動
        allRows[0]=rnum1
        element[allRows[j][0]].innerText=`6`
        element[allRows[j][1]].innerText=`7`
        j+=1
    }  
}
//初始隨機
const randomBox=()=>{
    let j=0
    for(element of randomRows){
        let randomnum=[0,1,2,3]
        //陣列.splice(從哪個位置開始, 要刪除幾個元素)(沒寫數字直接把後面砍掉)
        //隨機取2數
        randomnum.splice(Math.floor(Math.random()*4),1)
        randomnum.splice(Math.floor(Math.random()*3),1)
        //先把原本的刪掉
        for(let i=0;i<4;i++){
            element[i].innerText=""
        }
        allRows[j]=randomnum
        if(j==4){element[randomnum[1]].addEventListener("click",clickRandom)}//移動
        element[randomnum[0]].innerText=`6`
        element[randomnum[1]].innerText=`7`
        j+=1
    }  
}
randomBox()


    