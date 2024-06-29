// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged, 
  User
} from "firebase/auth"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgQdKkJ-RNDYmwkm2GSCBNzgPgOGMJ_so",
  authDomain: "not-f27bd.firebaseapp.com",
  projectId: "not-f27bd",
  // storageBucket: "not-f27bd.appspot.com",
  // messagingSenderId: "91976732163",
  appId: "1:91976732163:web:91e7132732b92a90d94836"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const provider = new GoogleAuthProvider();

/**
 * Signs the user with Google popUp
 * @return Promise<User | null>
 */

export function signInWithGoogle(){
    return signInWithPopup(auth, new GoogleAuthProvider())  
}

/**
 * Signs the user out
 * @return User | null
 */ 

export function signOut(){
    return auth.signOut()
}

/**
 * Trigger a callback function when the user signs in or out
 * @returns a function that removes the listener
 */

export function onAuthStateChangedHelper(callback: (user: User | null) => void){
    return onAuthStateChanged(auth, callback)
} 