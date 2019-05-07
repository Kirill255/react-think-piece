const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

const firestore = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// This will fail for the stupidest reason. async is not supported in Node 6.
// You have two options: rewrite this for promises or use the Node 8 engine, just add to package.json { "engines" : { "node" : "8" } }
// https://firebase.google.com/docs/functions/get-started
// Function URL (getAllPosts): https://us-central1-react-think-piece-a2506.cloudfunctions.net/getAllPosts
exports.getAllPosts = functions.https.onRequest(async (request, response) => {
  const snapshot = await firestore.collection("posts").get();
  const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  response.json({ posts });
});
