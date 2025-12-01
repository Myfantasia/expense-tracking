import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDaXhTPDTP8wPbj33d2t104oHqmcTUA-Bw",
  authDomain: "expense-tracker-3caaa.firebaseapp.com",
  projectId: "expense-tracker-3caaa",
  storageBucket: "expense-tracker-3caaa.firebasestorage.app",
  messagingSenderId: "859570420794",
  appId: "1:859570420794:web:ba5dfdada6957b29ca0903",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
