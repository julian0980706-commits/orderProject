let canClick=true
/*
    *6X11 
*/ 
//*盡量不要用innerHtml因為重整耗資源且原本變數不能使用
const gameArea= document.getElementById("gameArea")
let stringInGameArea=""//*管理gamearea的內容，如html等
//*遊戲邏輯 先創建一堆div 幫他們貼data-x data-y然後之後用陣列儲存div如 [1][3]要改變時可以找到座標
const coordinate=[]//*[y][x]因為grid先橫在直 左至右 
for(let i=1;i<=9;i++){
    for(let k=1;k<=6;k++){
        //*每個都給他data-x 與data-y 讀取時會讀取一個data物件的x y屬性
        stringInGameArea+=`<div data-y=${i} data-x=${k}
        style="grid-area: ${i} / ${k}"></div>`//*固定背景54個div  grid都是直 橫
    }
}
gameArea.innerHTML+=stringInGameArea
for(let x=1;x<=6;x++){
    coordinate[x]=[]
    for(let y=1;y<=9;y++){
        coordinate[x][y]=document.querySelector(`[data-x="${x}"][data-y="${y}"]`)
        //*注意貼標時事yx 陣列是xy
        //*給每個div先有個屬性 
        coordinate[x][y].ifFull=false
        coordinate[x][y].color=""
    }
}


for(let i=1;i<=6;i++){
    coordinate[i][1].innerText="投入"
    coordinate[i][1].style.border="1px solid black"
    coordinate[i][1].style.backgroundColor="red"
    coordinate[i][1].addEventListener("click",(e)=>{
        if(!canClick){return;}
        canClick=false
        let destination=9//*表示要去第幾格(y)，都沒有ifFull的話去第9
        //*首先先看一下 他那一排裡的東西 同一個x 從上往下最直覺
        let index=0
        for(let j=1;j<=9;j++){
            if(coordinate[i][j].ifFull){
                destination=index
                break;
            }
            index++
        }
        if(destination<=1){canClick=true; return;}//*根本沒辦法丟時
        //*在他那裏建立一個方塊
        const block =document.createElement(`div`)
        block.style.zIndex="100"
        block.style.backgroundColor="blue"
        block.style.gridColumn=i//*grid從1開始計算
        block.style.gridRow=1
        gameArea.appendChild(block)//*把他丟進去gamearea 現在才開始顯示
        let lastTime=0
        let y=0
        let fallinSpeed=5
        const fallin=(timestamp)=>{
            fallinSpeed+=0.25
            if(lastTime){
                fallinSpeed*= (timestamp-lastTime)/16.67
            }
            lastTime=timestamp
            y+=fallinSpeed
            if(y>(destination-1)*100){
                y=(destination-1)*100
                block.style.transform=`translateY(${y}%)` //?注意grid的%是自己的%，非母元素
                block.style.display="none"
                //*背景一格改變
                coordinate[i][destination].ifFull=true;
                coordinate[i][destination].style.backgroundColor="red"
                coordinate[i][destination].color="red"
                canClick=true
                return;
            }
            block.style.transform=`translateY(${y}%)`
            window.requestAnimationFrame(fallin)
        }
        window.requestAnimationFrame(fallin)
    })
    
}
