// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCT00mnk6ylSy8shYhVezcwl1fIeA2ieM8",
  authDomain: "cooking-app-a49f6.firebaseapp.com",
  projectId: "cooking-app-a49f6",
  storageBucket: "cooking-app-a49f6.firebasestorage.app",
  messagingSenderId: "350627470760",
  appId: "1:350627470760:web:1bbd6281ed0e61e28e919d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
