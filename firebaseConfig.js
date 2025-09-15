// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpNVrhXIKyys_YmBkB0htNLCG-mNkCDoU",
  authDomain: "calculador-de-distancia-1a4e2.firebaseapp.com",
  projectId: "calculador-de-distancia-1a4e2",
  storageBucket: "calculador-de-distancia-1a4e2.firebasestorage.app",
  messagingSenderId: "608187417071",
  appId: "1:608187417071:web:8d1ac110bc63f43a40f61a",
  measurementId: "G-PF49SEVSN2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Analytics only in the browser
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}