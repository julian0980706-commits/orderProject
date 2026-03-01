/* !會把一個東西轉換成布林值並反轉。在 JS 中，只有以下這些東西被視為 「Falsy」（假的）：
    null (當你還沒存過資料時)
    undefined
    0 (數字)
    "" (空字串)
    false (布林值)
    除了這些，其他通通都是「Truthy」（真的）。
    if判斷是判斷是否為truthy
 */
//localStorage.removeItem("hasVisited_v1")
let whBe=window.innerWidth/window.innerHeight//螢幕長寬比
document.addEventListener("DOMContentLoaded", () => {
    let hasVisited = localStorage.getItem("hasVisited_v1");
    const overlay = document.getElementById("guide_overlay");
    const slides = document.querySelectorAll(".slide");
    let slideIndex = 0;
    if (!hasVisited) {
        console.log("you are new");
        overlay.classList.remove("hide");//顯示 (hide權重較低)
        document.getElementById("title").innerText="Welcome"
        localStorage.setItem("hasVisited_v1", "true");
    } else {
        console.log("welcome back");
    }
    function showSlide(n) {
        if (n >= slides.length) slideIndex = 0;
        if (n < 0) slideIndex = slides.length - 1;
        slides.forEach(s => s.style.display = "none");
        slides[slideIndex].style.display = "block";
    }
    showSlide(slideIndex);
    document.getElementById("prevBtn").onclick = () => showSlide(--slideIndex); //先運算再傳參數 --寫在後就是先執行完函式在運算 
    document.getElementById("nextBtn").onclick = () => showSlide(++slideIndex);
    document.getElementById("QA").onclick = () => overlay.classList.remove("hide");//顯示
    document.getElementById("close").onclick = () => overlay.classList.add("hide");//隱藏
    const moveCube= document.getElementById("moveCube")
    moveCube.style.position = 'absolute';
    let rnumS=Math.floor(Math.random()*4)
    let rnumX=Math.floor(Math.random()*70)
    let rnumY=Math.floor(Math.random()*40)
    let x
    let y
    let j=0 //67variable
    let sixSeven=[6,7]
    if(rnumS===0){
        y=0
        x=10+rnumX
    }
    else if(rnumS===1){
        x=0
        y=4+rnumY
    }
    else if(rnumS===2){
        y=43-15*whBe
        x=10+rnumX
    }
    else if(rnumS===3){
        x=85
        y=4+rnumY
    } 
    //requestAnimationFrame功能　1.每次執行時會等到螢幕刷新時執行函式 2.當看其他分頁時，會停止
    //方塊移動
    //決定初始速度
    let Xspeed=0.3
    let Yspeed=0.4
    moveCube.style.bottom='auto'
    moveCube.style.right='auto' 
    moveCube.style.transform = `translate(${x}vw, ${y}vh)`
    moveCube.style.display="flex"
    moveCube.innerText=sixSeven[0]
    moveCube.style.willChange = 'transform';
    let change=true
    let lasttime=0//紀錄時間差
    const cubeRun=(timestamp)=>{//timestamp特性 非常精確的紀錄當時時間 
        if(lasttime!=0){
            x = x+Xspeed*((timestamp-lasttime)/16.67)//爭樹快依比例跑慢
            y = y+Yspeed*((timestamp-lasttime)/16.67)
        }
        else{
            x=x+Xspeed
            y=y+Yspeed
        }
        lasttime=timestamp
        moveCube.style.transform = `translate(${x}vw, ${y}vh)`;
        //碰撞邏輯
        //撞到哪邊的邊界 x/y其中之一變號
        let i=0
        if(x>0&&x<85&&y>0&&y<43-15*whBe){
            change=true //防止震動
        }
        if(x<=0||x>=85){
            i+=3
        }
        if(y<=0||y>=43-15*whBe){
            i--
        }
        if(i==-1){
            if(change){
                Yspeed=-Yspeed
                moveCube.style.backgroundColor=`rgb(${Math.floor(Math.random()*250)},${Math.floor(Math.random()*250)},${Math.floor(Math.random()*250)},${Math.random()})`
                if(j>1){j=0}
                moveCube.innerText=sixSeven[j]
                j++
            }
        }
        if(i==3){
            if(change){
                Xspeed=-Xspeed
                moveCube.style.backgroundColor=`rgb(${Math.floor(Math.random()*250)},${Math.floor(Math.random()*250)},${Math.floor(Math.random()*250)},${Math.random()})`
                if(j>1){j=0}
                moveCube.innerText=sixSeven[j]
                j++
            } 
        }
        if(i==2){
            if(change){
                Xspeed=-Xspeed
                Yspeed=-Yspeed
                moveCube.style.backgroundColor=`rgb(${Math.floor(Math.random()*250)},${Math.floor(Math.random()*250)},${Math.floor(Math.random()*250)},${Math.random()})`
                if(j>1){j=0}
                moveCube.innerText=sixSeven[j]
                j++
            }
        }
        if(i!=0){
            change=false
        }
        requestAnimationFrame(cubeRun)
    }
    requestAnimationFrame(cubeRun)
    
});