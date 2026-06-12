import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
  getAuth, 
  GoogleAuthProvider 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getMessaging } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging.js";

export const messaging = getMessaging(app);

// 🔴 YOUR REAL FIREBASE CONFIG (must be correct)
const firebaseConfig = {
  apiKey:  "AIzaSyBXyQBAFs-upsx73AGmsvIYEWTGAr1gQwA",
  authDomain: "assignment-tracker-56094.firebaseapp.com",
  projectId: "assignment-tracker-56094",
  storageBucket: "assignment-tracker-56094.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);

// IMPORTANT FIX: create provider properly
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

// Firestore
export const db = getFirestore(app);
