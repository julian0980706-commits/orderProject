const commit=document.getElementById("commit")
const delarea=document.getElementById("delarea")
const cancel=document.getElementById("cancel")
const confirm=document.getElementById("confirm")
confirm.disabled=true
import { collection, getDoc ,query,orderBy,updateDoc,where,doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "./config.js";
const docRef=doc(db,"admin","toDayForm")
let element
try{
    element =  await getDoc(docRef)
}
catch(e){
    alert("網路不穩，請稍後再試")
}
element=element.data().toDayForm
console.log(element)
const stores=document.getElementsByName("store")//取得按鈕們
for (let store of stores){
    if(store.value==element){
        store.checked=true 
    }
}
confirm.disabled=false

commit.addEventListener("click",()=>{
    delarea.showModal()
    cancel.addEventListener("click",()=>{delarea.close()})
    confirm.addEventListener("click",()=>{
        const toDayMeal=document.querySelector('input[name="store"]:checked').value
        const upload=async()=>{
            try{
                await updateDoc(docRef,{"toDayForm":toDayMeal})
                location.reload()
            }
            catch(e){
                alert("網路不穩，請稍後再試")
            }
        }
        upload()
    })
})