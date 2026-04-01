const index = document.getElementById("index")
const start = document.getElementById("start")
const gameArea = document.getElementById("gameArea")
const timer = document.getElementById("timer")
const stratBtn = document.getElementById("start")
const smallTitle = document.getElementById("smallTitle")
//管一整排的大div
let Row_1 = document.getElementById("First")
let Row_2 = document.getElementById("Second")
let Row_3 = document.getElementById("Third")
let Row_4 = document.getElementById("Fourth")
let Row_5 = document.getElementById("Fifth")
let Row_6 = document.getElementById("Sixth")
let RandomRows = [Row_1, Row_2, Row_3, Row_4, Row_5, Row_6]
//管內容的放div
let row_1 = document.getElementsByClassName("first")
let row_2 = document.getElementsByClassName("second")
let row_3 = document.getElementsByClassName("third")
let row_4 = document.getElementsByClassName("fourth")
let row_5 = document.getElementsByClassName("fifth")
let row_6 = document.getElementsByClassName("sixth")
let randomRows = [row_1, row_2, row_3, row_4, row_5, row_6]
//管位置的，放位置
let rnum1 = []
let rnum2 = []
let rnum3 = []
let rnum4 = []
let rnum5 = []
let rnum_6 = []
let allRows = [rnum1, rnum2, rnum3, rnum4, rnum5, rnum_6]//二維陣列
let sixHaveBeenClicked = false//控制67邏輯
let canClick = false//在移動中禁止任何事情
let firstPlay = true
let timerId//計時器停止用
let lastTimeImage = []//撕標籤方便
let righOrLeft//決定6在左或右的 0或1
let timeUp = false//檢查死亡原因
let diff
let score = 0//計算得分

// 強制鎖：防止結束後的異步操作
let isGameOver = false;

const endGame = (e) => {
    if (isGameOver) return; // 防止重複執行
    isGameOver = true;
    canClick = false;

    gameArea.style.pointerEvents = "none";
    for (let row of randomRows) {
        for (let cell of row) {
            cell.removeEventListener("click", clickRandom);
            cell.removeEventListener("click", sixMove);
            cell.removeEventListener("click", endGame);
        }
    }
    //加有動畫的class
    canClick = false
    clearInterval(timerId)
    if (timeUp) {
        for (let element of RandomRows) {
            element.classList.add("no-transition"); // 拔掉動畫，避免它慢慢滑回去
            element.style.transform = "translateY(-13.99dvh)"; // 強制歸位到最上方
        }
        index.style.display = "flex"
        smallTitle.style.display = "block"
        smallTitle.innerText = "Time's up"
        stratBtn.innerText = "再玩一次"
        title.innerText = `得分:${score}`
    }
    else {
        if (e && e.target) e.target.classList.add("flash")
        canClick = false
        setTimeout(() => {
            for (let element of RandomRows) {
                element.classList.add("no-transition"); // 拔掉動畫，避免它慢慢滑回去
                element.style.transform = "translateY(-13.99dvh)"; // 強制歸位到最上方
            }
            index.style.display = "flex"
            if (e && e.target) e.target.classList.remove("flash")
            smallTitle.style.display = "none"
            stratBtn.innerText = "再玩一次"
            title.innerText = `得分:${score}`
        }, 900)
    }
}
const sixMove = (e) => {
    if (canClick && !isGameOver) {
        score++
        //e.target就是被按的東西
        e.target.classList.add("sixClick")
        e.target.innerText = ""
        sixHaveBeenClicked = true
    }
}
//7的移動
const clickRandom = () => {
    if (canClick && !isGameOver) {
        score++
        if (sixHaveBeenClicked) {
            //先讓整排慢慢掉下去
            for (let element of RandomRows) {
                element.style.transform = "translateY(0)";
                canClick = false
            }
            setTimeout(() => {
                // 如果在動畫延遲期間遊戲結束了，就直接停止
                if (isGameOver) return;
                if (!canClick) {
                    for (let element of RandomRows) {
                        element.classList.add("no-transition");//拔掉transition
                    }
                    // 🔥 神奇咒語：強迫瀏覽器立刻更新樣式表
                    // 讀取 offsetHeight 會逼瀏覽器在執行下一行前，先確認樣式已經切換成 no-transition
                    void Row_1.offsetHeight;
                    for (let element of RandomRows) {
                        element.style.transform = "translateY(-13.99dvh)"
                    }

                    let j = 0
                    //複製一個陣列(不能直接array1=array2這樣會使兩個array連通)
                    const copyAllRows = []
                    for (let i = 0; i < allRows.length; i++) {
                        copyAllRows.push([...allRows[i]]) // 修正淺拷貝
                    }
                    //紀錄上一排移下來
                    for (let i = 1; i < allRows.length; i++) {
                        allRows[i] = copyAllRows[i - 1]
                    }
                    //隨機第一個
                    let randomnum = [0, 1, 2, 3]
                    righOrLeft = Math.floor(Math.random() * 2)
                    randomnum.splice(Math.floor(Math.random() * 4), 1)
                    randomnum.splice(Math.floor(Math.random() * 3), 1)
                    if (righOrLeft == 1) {
                        randomnum.push(randomnum[1])
                        randomnum.push(randomnum[0])
                        randomnum.splice(0, 2)
                    }
                    rnum1 = randomnum
                    rnum1.push(`rgb(${Math.floor(Math.random() * 250)},${Math.floor(Math.random() * 250)},${Math.floor(Math.random() * 250)})`)
                    rnum1.push(`rgb(${Math.floor(Math.random() * 250)},${Math.floor(Math.random() * 250)},${Math.floor(Math.random() * 250)})`)
                    //畫出來
                    for (let element of randomRows) {
                        for (let i = 0; i < 4; i++) {
                            element[i].innerText = ""
                        }
                        for (let k = 0; k < 4; k++) {
                            element[k].removeEventListener("click", clickRandom)
                            element[k].removeEventListener("click", sixMove)
                            element[k].removeEventListener("click", endGame)
                            element[k].style.color = "black"
                            element[k].style.backgroundColor = "white"
                        }
                        //移動
                        allRows[0] = rnum1
                        righOrLeft = Math.floor(Math.random() * 2)
                        element[allRows[j][0]].innerText = `6`
                        element[allRows[j][1]].innerText = `7`
                        //randomColor
                        console.log(element[allRows[j][2]])
                        element[allRows[j][0]].style.color = allRows[j][2]
                        element[allRows[j][1]].style.color = allRows[j][3]
                        if (j == 4) {
                            element[allRows[4][1]].addEventListener("click", clickRandom)
                            element[allRows[4][0]].addEventListener("click", sixMove)
                        }
                        for (let c = 0; c < 4; c++) {
                            //空白結束遊戲
                            if (c != allRows[j][0] && c != allRows[j][1]) {
                                element[c].addEventListener("click", endGame)
                            }
                        }
                        if (j == 5) {
                            for (let d of lastTimeImage) {
                                element[d].classList.remove("sixSevenKid")
                                element[d].style.color = "white"
                            }
                            lastTimeImage = []
                            lastTimeImage.push(allRows[5][1])
                            lastTimeImage.push(allRows[5][0])
                            element[allRows[5][1]].style.backgroundColor = "black"
                            element[allRows[5][0]].style.backgroundColor = "black"
                            element[allRows[5][1]].classList.add("sixSevenKid")
                            element[allRows[5][0]].classList.add("sixSevenKid")
                            element[allRows[5][1]].innerText = ""
                            element[allRows[5][0]].innerText = ""
                        }
                        j += 1
                    }
                    sixHaveBeenClicked = false
                    canClick = true
                    for (let element of RandomRows) {
                        element.classList.remove("no-transition");//讓transition回來
                    }
                    const clickedSix = document.querySelector('.sixClick');
                    if (clickedSix) clickedSix.classList.remove("sixClick");
                }
            }, 30)
        }
    }
}
//初始隨機
const randomBox = () => {
    isGameOver = false; // 重置狀態
    gameArea.style.pointerEvents = "auto";
    for (let element of randomRows) {
        for (let i = 0; i < 4; i++) {
            element[i].innerText = ""
        }
    }
    let j = 0
    for (let element of randomRows) {
        if (j != 5) {
            let randomnum = [0, 1, 2, 3]
            //陣列.splice(從哪個位置開始, 要刪除幾個元素)(沒寫數字直接把後面砍掉)
            //隨機取2數
            let blankNum = []
            let f = Math.floor(Math.random() * 4)
            blankNum.push(randomnum[f])
            randomnum.splice(f, 1)
            let s = Math.floor(Math.random() * 3)
            blankNum.push(randomnum[s])
            randomnum.splice(s, 1)
            //先把原本的刪掉
            for (let i = 0; i < 4; i++) {
                element[i].innerText = ""
            }
            righOrLeft = Math.floor(Math.random() * 2)
            allRows[j].push(randomnum[0])
            allRows[j].push(randomnum[1])
            //隨機67左右出現
            if(righOrLeft==0){
                allRows[j].push(randomnum[1])
                allRows[j].push(randomnum[0])
                allRows[j].splice(0,2)
            }
            if (j == 4) { element[allRows[j][0]].addEventListener("click", sixMove) }//移動
            if (j == 4) { element[allRows[j][1]].addEventListener("click", clickRandom) }//移動
            element[allRows[j][0]].innerText = `6`
            element[allRows[j][1]].innerText = `7`
            //allrows[j]後兩位記顏色
            allRows[j].push(`rgb(${Math.floor(Math.random() * 250)},${Math.floor(Math.random() * 250)},${Math.floor(Math.random() * 250)})`)
            allRows[j].push(`rgb(${Math.floor(Math.random() * 250)},${Math.floor(Math.random() * 250)},${Math.floor(Math.random() * 250)})`)
            element[randomnum[0]].style.color = allRows[j][2]
            element[randomnum[1]].style.color = allRows[j][3]
            element[blankNum[0]].addEventListener("click", endGame)
            element[blankNum[1]].addEventListener("click", endGame)
            j += 1
        }
    }
}
const start_game = () => {
    isGameOver = false; // 遊戲開始，解鎖
    timeUp = false
    score = 0
    canClick = true
    timer.innerText = "20.00"
    //計時器
    let startTime = Date.now()
    timerId = setInterval(() => {
        let currentTime = Date.now()
        diff = (20000 - (currentTime - startTime)) / 1000; // 修正計時邏輯
        timer.innerText = Math.max(0, diff).toFixed(2) + "s"; // 把數字轉成字串，並強制顯示到小數點後兩位
        if (diff <= 0) {
            timer.innerText = "0.00s"
            timeUp = true
            clearInterval(timerId)//防重複呼叫
            endGame()
        }
    }, 30)
    sixHaveBeenClicked = false
    index.style.display = "none"
    gameArea.style.display = "block"
    gameArea.style.pointerEvents = "auto"; // 恢復點擊
    canClick = true
    if (!firstPlay) {
        for(let element of allRows){
            element.splice(0,element.length)
        }
        for (let element of RandomRows) {
            element.classList.remove("no-transition");//拔掉transition
        }
        for (let element of randomRows) {
            for (let i = 0; i < 4; i++) {
                element[i].innerText = ""
                element[i].style.backgroundColor = "white"
                element[i].removeEventListener("click", clickRandom)
                element[i].removeEventListener("click", sixMove)
                element[i].removeEventListener("click", endGame)
            }
        }
        randomBox()//避免第一次玩隨機兩次
        document.querySelectorAll('.sixSevenKid').forEach((element) => {
            element.classList.remove("sixSevenKid")
        })
        const oldSix = document.querySelector('.sixClick');
        if (oldSix) oldSix.classList.remove("sixClick");
    }

    firstPlay = false

}
start.addEventListener("click", start_game)
randomBox()