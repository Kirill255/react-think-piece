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

exports.sanitizeContent = functions.firestore //
  .document("posts/{postId}")
  .onWrite(async (change) => {
    if (!change.after.exists) return;

    const { content, sanitized } = change.after.data();

    if (content && !sanitized) {
      return change.after.ref.update({
        content: content.replace(/CoffeeScript/g, "***"),
        sanitized: true // добавили флаг, чтобы понимать очищен контент или нет,
      });
    }

    return null;
  });

exports.incrementCommentCount = functions.firestore
  .document("posts/{postId}/comments/{commentId}")
  .onCreate(async (snapshot, context) => {
    const { postId } = context.params;
    const postRef = firestore.doc(`posts/${postId}`);

    const snap = await postRef.get("comments");
    const comments = snap.get("comments");

    return postRef.update({ comments: comments + 1 });
  });
