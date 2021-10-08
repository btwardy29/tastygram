import { initializeApp } from 'firebase/app'
import { getFirestore, serverTimestamp } from 'firebase/firestore'
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyB8Vr3hxdV7Y488RfGTm8aD8HGsat4q0pY",
  authDomain: "tastygram-c3644.firebaseapp.com",
  projectId: "tastygram-c3644",
  storageBucket: "tastygram-c3644.appspot.com",
  messagingSenderId: "833279061432",
  appId: "1:833279061432:web:eeb9c46f34eeabc180f34d",
  measurementId: "G-L2M1ZW5PZX"
};

// Init firebase
const app = initializeApp(firebaseConfig);

// Init services
const projectFirestore = getFirestore()
const projectStorage = getStorage()
const auth = getAuth()

// Timestamp
const timestamp = serverTimestamp()

export { projectFirestore, auth, timestamp, projectStorage }