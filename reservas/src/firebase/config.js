// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvMiaBYvFyTnfRLs_knxRRILwvUi5BwH4",
  authDomain: "reservas-salon.firebaseapp.com",
  projectId: "reservas-salon",
  storageBucket: "reservas-salon.appspot.com",
  messagingSenderId: "383065092903",
  appId: "1:383065092903:web:c87cc086d73253e528ef02",
  measurementId: "G-7VBM2L2Q45"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();