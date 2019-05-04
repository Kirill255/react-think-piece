import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

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

export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();

export const createUserProfileDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`); // получили ссылку
  const snapshot = await userRef.get(); // получили документ

  // If there isn't a document for that user. Let's use information that we got from either Google or our sign up form.
  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("Error creating user: ", error.message);
    }
  }

  // Get the document and return it, since that's what we're likely to want to do next.
  return getUserDocument(user.uid);
};

export const getUserDocument = async (uid) => {
  if (!uid) return null;

  try {
    const userDocument = await firestore
      .collection("users")
      .doc(uid)
      .get();

    return { uid, ...userDocument.data() };
  } catch (error) {
    console.error("Error fetching user: ", error.message);
  }
};

// dec only
window.firebase = firebase;

export default firebase;
