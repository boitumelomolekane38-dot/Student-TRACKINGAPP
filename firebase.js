import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getMessaging } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging.js";

const firebaseConfig = {
  apiKey: "AIzaSyBXyQBAFs-upsx73AGmsvIYEWTGAr1gQwA",
  authDomain: "assignment-tracker-56094.firebaseapp.com",
  projectId: "assignment-tracker-56094",
  storageBucket: "assignment-tracker-56094.appspot.com",
  messagingSenderId: "624686553192",
  appId: "1:624686553192:web:eff0eb468a9f98d1a083dd"
};

// Initialize Firebase FIRST
const app = initializeApp(firebaseConfig);

// THEN create services
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const messaging = getMessaging(app);

provider.setCustomParameters({
  prompt: "select_account"
});
