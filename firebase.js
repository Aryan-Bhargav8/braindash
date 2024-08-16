// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkcR9p780XvjPRJ8iod3wdlbPMTF6D1qs",
  authDomain: "braindash-cd3b2.firebaseapp.com",
  projectId: "braindash-cd3b2",
  storageBucket: "braindash-cd3b2.appspot.com",
  messagingSenderId: "489369191391",
  appId: "1:489369191391:web:4d79d3e29a25ec50d3fa6a",
  measurementId: "G-7W0WMRX1ZP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);