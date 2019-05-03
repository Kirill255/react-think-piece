import firebase from "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyCd59mO8EZJX_QGFVrp9AowiojK4IVOI_o",
  authDomain: "react-think-piece-a2506.firebaseapp.com",
  databaseURL: "https://react-think-piece-a2506.firebaseio.com",
  projectId: "react-think-piece-a2506",
  storageBucket: "react-think-piece-a2506.appspot.com",
  messagingSenderId: "876600498159"
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();

// dec only
window.firebase = firebase;

export default firebase;
