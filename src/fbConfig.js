// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBi9ZpJ4Mk9gdZmR76Ag7cwq4TBT9C4Roo",
  authDomain: "e-decor-app.firebaseapp.com",
  projectId: "e-decor-app",
  storageBucket: "e-decor-app.appspot.com",
  messagingSenderId: "965908742246",
  appId: "1:965908742246:web:68739b57eb94b4b4c92da7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db= getFirestore(app);

export {auth, db};