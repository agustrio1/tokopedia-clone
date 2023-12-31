import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, firestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCf4NDJsAaSF9t18MMku7prX2OJbfgMAzo",
  authDomain: "tokopedia-fd6bb.firebaseapp.com",
  projectId: "tokopedia-fd6bb",
  storageBucket: "tokopedia-fd6bb.appspot.com",
  messagingSenderId: "177448956166",
  appId: "1:177448956166:web:5bfc77f19a229640636e87",
  measurementId: "G-5NCPYB59Q9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let currentUser = null;

onAuthStateChanged(auth, (user) => {
  currentUser = user;
});

export { auth, app, db, onAuthStateChanged, currentUser };