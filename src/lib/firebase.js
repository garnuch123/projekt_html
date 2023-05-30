import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDy5P8O-dFLNOa1Adlj1UCdSpjXtZ72Jmc",
  authDomain: "authtutorial-f75bf.firebaseapp.com",
  projectId: "authtutorial-f75bf",
  storageBucket: "authtutorial-f75bf.appspot.com",
  messagingSenderId: "943911224992",
  appId: "1:943911224992:web:334bdac1e2205612872bc5",
  measurementId: "G-XDT4DQ2KWE"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage =  getStorage(app);
