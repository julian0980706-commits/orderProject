import { collection, getDoc ,query,orderBy,updateDoc,where,doc,setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "./config.js";
const container=document.getElementById("container")
const commit=document.getElementById("commit")
const delarea=document.getElementById("delarea")
const cancel=document.getElementById("cancel")
const confirm=document.getElementById("confirm")
commit.disabled=true
const stores=[
    "beanDad",
    "beefnoodles",
    "curry",
    "spicy",
    "dumplings",
    "firemeat",
    "lunchbox",
    "redBuilding",
    "steak",
    "susi",
    "turkey",
    "southSeaChickenRice"
]
const TorN=[]
//for可以await forEach不行
for(let store of stores){
    let docRef=doc(db,"forms",store)
    let ifShow= await getDoc(docRef)
    ifShow=ifShow.data().show
    TorN.push(ifShow)
    //控制checkbox
}
let j=0
for(let store of stores){
    document.getElementById(store).checked=TorN[j]
    j++
}
commit.disabled=false
commit.addEventListener("click",()=>{
    delarea.showModal()
    cancel.addEventListener("click",()=>{delarea.close()})
    confirm.addEventListener("click",async()=>{
        container.disabled=true
        cancel.disabled=true
        confirm.disabled=true
        let i=0
        const docRefs=[]
        for(let store of stores){
            const checked=document.getElementById(store)
            if(document.getElementById(store).checked!=TorN[i]){
                console.log(store)
                let insideDocRef=doc(db,"forms",store)
                try{await updateDoc(insideDocRef,{show:document.getElementById(store).checked})}
                catch(e){
                    alert("阿")
                }
            }
            i++
        }
        location.reload()
    })
})
