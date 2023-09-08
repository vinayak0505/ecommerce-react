import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_Wn1Va5Dx6tY2aw8n27R4X6qhGlJkgEs",
  authDomain: "react-ecommerce-9d1f4.firebaseapp.com",
  projectId: "react-ecommerce-9d1f4",
  storageBucket: "react-ecommerce-9d1f4.appspot.com",
  messagingSenderId: "918021633023",
  appId: "1:918021633023:web:3b40a68f4df6bc3b7cedca"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);