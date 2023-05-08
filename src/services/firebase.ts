// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIutF4LDhLMWwOY9sPuJqlKUZTjFIw5ec",
  authDomain: "flashcards-b0733.firebaseapp.com",
  projectId: "flashcards-b0733",
  storageBucket: "flashcards-b0733.appspot.com",
  messagingSenderId: "243276063619",
  appId: "1:243276063619:web:ddb861e7bd50016c3b8cb6"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;