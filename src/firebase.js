// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcnwA0rbfkl9xLDsKip90UQJiEhEI-Zqk",
  authDomain: "fir-auth-uicha.firebaseapp.com",
  projectId: "fir-auth-uicha",
  storageBucket: "fir-auth-uicha.appspot.com",
  messagingSenderId: "1016743172246",
  appId: "1:1016743172246:web:7fad891741810296344ab7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
