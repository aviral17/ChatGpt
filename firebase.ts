// https://www.npmjs.com/package/firebase
//  https://console.firebase.google.com/u/0/project/chatgpt-messenger-yt-1d977/settings/general
//  check Notes.txt
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "chatgpt-messenger-yt-1d977.firebaseapp.com",
  projectId: "chatgpt-messenger-yt-1d977",
  storageBucket: "chatgpt-messenger-yt-1d977.appspot.com",
  messagingSenderId: "557525716473",
  appId: "1:557525716473:web:771c67729d2399284a0128",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

const app = getApps().length ? getApp() : initializeApp(firebaseConfig); // getApp if already database present else initialize App
const db = getFirestore(app);
export { db };
