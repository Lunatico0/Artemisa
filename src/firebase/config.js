import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAPst0wTue7GmMrH7twQQVFPwHc4pA5jq4",
  authDomain: "artemisa-db.firebaseapp.com",
  projectId: "artemisa-db",
  storageBucket: "artemisa-db.appspot.com",
  messagingSenderId: "390969288366",
  appId: "1:390969288366:web:274cf75410b81bcdf62f3f",
  measurementId: "G-9KXVHWEK47"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);