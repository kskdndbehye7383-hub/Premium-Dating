import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCBBtA7uKWMpfVlTfyrjTUR2z3CEVrVqac",
  authDomain: "premium-dating-6287f.firebaseapp.com",
  projectId: "premium-dating-6287f",
  storageBucket: "premium-dating-6287f.firebasestorage.app",
  messagingSenderId: "908344342213",
  appId: "1:908344342213:web:c4165e01d51a2a21cb22ac",
  measurementId: "G-W6QCSB8281"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
