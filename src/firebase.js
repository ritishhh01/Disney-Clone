// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcKmRRMeeufDzSSmFtu_jzZPlcmsLGQDE",
  authDomain: "disneyplus-clone-5f831.firebaseapp.com",
  projectId: "disneyplus-clone-5f831",
  storageBucket: "disneyplus-clone-5f831.firebasestorage.app",
  messagingSenderId: "170514859187",
  appId: "1:170514859187:web:4052b0afdf8f5658ad5cc6",
  measurementId: "G-C43HKRX12D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();


export { auth, provider, storage };
export default db;

