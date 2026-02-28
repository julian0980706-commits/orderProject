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
});