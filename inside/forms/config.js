import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyAi09ke5VrH4CDcxqN5bU6qKzAP917lvT4",
  authDomain: "order-9430b.firebaseapp.com",
  projectId: "order-9430b",
  storageBucket: "order-9430b.firebasestorage.app",
  messagingSenderId: "588632747827",
  appId: "1:588632747827:web:abdd640ca670b0cca4d846",
  measurementId: "G-KTP9BS35MM"
};
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app) //輸出一個變數 可惜不能export import的東西