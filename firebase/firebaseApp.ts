import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: should be moved to .env file
// Config made anonymous
const firebaseConfig = {};

const firebaseApp = initializeApp(firebaseConfig)
export const firebaseDB = getFirestore(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp);

export default firebaseApp;