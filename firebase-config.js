// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiHZex5QYQQ4vY-ZNbGzuhQgdQVtamB1Y",
  authDomain: "techgenuis-inscription.firebaseapp.com",
  projectId: "techgenuis-inscription",
  storageBucket: "techgenuis-inscription.firebasestorage.app",
  messagingSenderId: "795996591328",
  appId: "1:795996591328:web:effae903a60256384bac85",
  measurementId: "G-283PB5Z46B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);