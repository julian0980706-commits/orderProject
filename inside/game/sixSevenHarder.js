const index= document.getElementById("index")
const start= document.getElementById("start")
const gameArea= document.getElementById("gameArea")
const timer= document.getElementById("timer")
const title=document.getElementById("title")
//管一整排的大div
let Row_1=document.getElementById("First")
let Row_2=document.getElementById("Second")
let Row_3=document.getElementById("Third")
let Row_4=document.getElementById("Fourth")
let Row_5=document.getElementById("Fifth")
let Row_6=document.getElementById("Sixth")
let RandomRows=[Row_1,Row_2,Row_3,Row_4,Row_5,Row_6] 
//管內容的放div
let row_1=document.getElementsByClassName("first")
let row_2=document.getElementsByClassName("second")
let row_3=document.getElementsByClassName("third")
let row_4=document.getElementsByClassName("fourth")
let row_5=document.getElementsByClassName("fifth")
let row_6=document.getElementsByClassName("sixth")
let randomRows=[row_1,row_2,row_3,row_4,row_5,row_6]
//管位置的，放位置
let rnum1=[]
let rnum2=[]
let rnum3=[]
let rnum4=[]
let rnum5=[]
let rnum_6=[]
let allRows=[rnum1,rnum2,rnum3,rnum4,rnum5,rnum_6]//二維陣列
let sixHaveBeenClicked=false//控制67邏輯
let canClick=true//在移動中禁止任何事情
let firstPlay=true
let timerId//計時器停止用
let lastTimeImage=[]//撕標籤方便
let righOrLeft//決定6在左或右的 0或1

const endGame=(e)=>{
    //加有動畫的class
    e.target.classList.add("flash")
    canClick=false
    setTimeout(()=>{
        for (let element of RandomRows) {
            element.classList.add("no-transition"); // 拔掉動畫，避免它慢慢滑回去
            element.style.transform = "translateY(-13.99dvh)"; // 強制歸位到最上方
        }
        index.style.display="flex"
        gameArea.style.display="none"
        e.target.classList.remove("flash")
        clearInterval(timerId)
    },910)
}
const sixMove=(e)=>{
    if(canClick){
        //e.target就是被按的東西
        e.target.classList.add("sixClick")
        e.target.innerText=""
        sixHaveBeenClicked=true
    }
}
//7的移動
const clickRandom=()=>{
    if(canClick){
        if(sixHaveBeenClicked){
            //先讓整排慢慢掉下去
            for(let element of RandomRows){
                element.style.transform = "translateY(0)"; 
                canClick=false
            }
            setTimeout(()=>{
                for(let element of RandomRows){
                    element.classList.add("no-transition");//拔掉transition
                }
                // 🔥 神奇咒語：強迫瀏覽器立刻更新樣式表
                // 讀取 offsetHeight 會逼瀏覽器在執行下一行前，先確認樣式已經切換成 no-transition
                void Row_1.offsetHeight;
                for(let element of RandomRows){
                    element.style.transform="translateY(-13.99dvh)"
                }
                
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
                for(let element of randomRows){
                    for(let i=0;i<4;i++){
                        element[i].innerText=""
                    }
                    for(let k=0;k<4;k++){
                        element[k].removeEventListener("click",clickRandom)
                        element[k].removeEventListener("click",sixMove)    
                        element[k].removeEventListener("click",endGame) 
                        element[k].style.color="black"
                        element[k].style.backgroundColor="white"
                    }        
                    //移動
                    allRows[0]=rnum1
                    righOrLeft=Math.floor(Math.random()*2)
                    if(righOrLeft==0){
                        element[allRows[j][0]].innerText=`6`
                        element[allRows[j][1]].innerText=`7`
                        //randomColor
                        element[allRows[j][0]].style.color=`rgb(${Math.floor(Math.random()*250)},${Math.floor(Math.random()*250)},${Math.floor(Math.random()*250)})`
                        element[allRows[j][1]].style.color=`rgb(${Math.floor(Math.random()*250)},${Math.floor(Math.random()*250)},${Math.floor(Math.random()*250)})`
                        if(j==4){
                        element[allRows[4][1]].addEventListener("click",clickRandom)
                        element[allRows[4][0]].addEventListener("click",sixMove)
                        }
                    }
                    else{
                        element[allRows[j][1]].innerText=`6`
                        element[allRows[j][0]].innerText=`7`
                        //randomColor
                        element[allRows[j][1]].style.color=`rgb(${Math.floor(Math.random()*250)},${Math.floor(Math.random()*250)},${Math.floor(Math.random()*250)})`
                        element[allRows[j][0]].style.color=`rgb(${Math.floor(Math.random()*250)},${Math.floor(Math.random()*250)},${Math.floor(Math.random()*250)})`
                        if(j==4){
                        element[allRows[4][0]].addEventListener("click",clickRandom)
                        element[allRows[4][1]].addEventListener("click",sixMove)
                    }
                    }
                    for(let c=0;c<4;c++){
                            //空白結束遊戲
                            if(c!=allRows[j][0]&&c!=allRows[j][1])
                            element[c].addEventListener("click",endGame)
                    }
                    if(j==5){
                        for(d of lastTimeImage){
                            element[d].classList.remove("sixSevenKid")
                            element[d].style.color="white"
                        }
                        lastTimeImage=[]
                        lastTimeImage.push(allRows[5][1])
                        lastTimeImage.push(allRows[5][0])
                        element[allRows[5][1]].style.backgroundColor="black"
                        element[allRows[5][0]].style.backgroundColor="black"
                        element[allRows[5][1]].classList.add("sixSevenKid")
                        element[allRows[5][0]].classList.add("sixSevenKid")
                        element[allRows[5][1]].innerText=""
                        element[allRows[5][0]].innerText=""
                    }
                    j+=1
                }    
                sixHaveBeenClicked=false
                canClick=true
                for(let element of RandomRows){
                    element.classList.remove("no-transition");//讓transition回來
                }
                document.querySelector('.sixClick').classList.remove("sixClick")
                
            },101)
        }  
    }
}
//初始隨機
const randomBox=()=>{
    for(let element of randomRows){
        for(let i=0;i<4;i++){
            element[i].innerText=""
        }
    }
    let j=0
    for(let element of randomRows){
        if(j!=5){
            let randomnum=[0,1,2,3]
            //陣列.splice(從哪個位置開始, 要刪除幾個元素)(沒寫數字直接把後面砍掉)
            //隨機取2數
            let blankNum=[]
            let f=Math.floor(Math.random()*4)
            blankNum.push(randomnum[f])
            randomnum.splice(f,1)
            let s=Math.floor(Math.random()*3)
            blankNum.push(randomnum[s])
            randomnum.splice(s,1)
            //先把原本的刪掉
            for(let i=0;i<4;i++){
                element[i].innerText=""
            }
            righOrLeft=Math.floor(Math.random()*2)
            allRows[j]=randomnum
            if(righOrLeft==0){
                if(j==4){element[randomnum[1]].addEventListener("click",clickRandom)}//移動
                if(j==4){element[randomnum[0]].addEventListener("click",sixMove)}//移動
                element[randomnum[0]].innerText=`6`
                element[randomnum[1]].innerText=`7`
                element[randomnum[0]].style.color=`rgb(${Math.floor(Math.random()*250)},${Math.floor(Math.random()*250)},${Math.floor(Math.random()*250)})`
                element[randomnum[1]].style.color=`rgb(${Math.floor(Math.random()*250)},${Math.floor(Math.random()*250)},${Math.floor(Math.random()*250)})`
            }
            else{
                if(j==4){element[randomnum[0]].addEventListener("click",clickRandom)}//移動
                if(j==4){element[randomnum[1]].addEventListener("click",sixMove)}//移動
                element[randomnum[1]].innerText=`6`
                element[randomnum[0]].innerText=`7`
                element[randomnum[1]].style.color=`rgb(${Math.floor(Math.random()*250)},${Math.floor(Math.random()*250)},${Math.floor(Math.random()*250)})`
                element[randomnum[0]].style.color=`rgb(${Math.floor(Math.random()*250)},${Math.floor(Math.random()*250)},${Math.floor(Math.random()*250)})`
            }
            //點到空白結束遊戲
            element[blankNum[0]].addEventListener("click",endGame)
            element[blankNum[1]].addEventListener("click",endGame)
            j+=1    
        }
    }  
}
start.addEventListener("click",()=>{
    timer.innerText="20.00"
    //計時器
    let startTime=Date.now()
    timerId = setInterval(()=>{
        let currentTime=Date.now()
        let diff = (20000-currentTime +startTime) / 1000; // 算出秒數差 並把毫秒/1000
        timer.innerText =diff.toFixed(2) + "s"; // 把數字轉成字串，並強制顯示到小數點後兩位
    },30)
    sixHaveBeenClicked=false
    index.style.display="none"
    gameArea.style.display="block"
    canClick=true
    if(!firstPlay){
        for(let element of RandomRows){
            element.classList.remove("no-transition");//拔掉transition
        }
        for(let element of randomRows){
            for(let i=0;i<4;i++){
                element[i].innerText=""
                element[i].style.backgroundColor="white"
                element[i].removeEventListener("click",clickRandom)
                element[i].removeEventListener("click",sixMove)    
                element[i].removeEventListener("click",endGame) 
            }
        }
    }
    firstPlay=false
    randomBox()
})


    