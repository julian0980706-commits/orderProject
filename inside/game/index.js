import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "../config.js"
import 'https://unpkg.com/@lottiefiles/dotlottie-wc@0.8.11/dist/dotlottie-wc.js';
const docRef=doc(db,"admin","toDayForm")
let Box = document.getElementsByClassName("Box");
Box[0].addEventListener("click",()=>{
    window.location.href="../index.html"
})
Box[3].addEventListener("click",()=>{
    window.location.href="../calendar.html"
})
Box[1].addEventListener("click",async()=>{
    Box[1].disabled=true
    try{
        let element
        element =await getDoc(docRef)
        element=element.data()
        element=element.toDayForm
        element="../forms/"+element+".html"
        window.location.href=element
    }
    catch(e){
        alert("網路不穩，請稍後再試")
    }
})
Box[2].addEventListener("click",async()=>{
    Box[1].disabled=true
    try{
        let element
        element =await getDoc(docRef)
        element=element.data()
        element=element.toDayForm
        element="../forms/"+element+"_remember.html"
        window.location.href=element
    }
    catch(e){
        alert("網路不穩，請稍後再試")
    }
})

