const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.createUserDoc = functions.auth.user().onCreate((user) => {
  const userDoc = {
    uid: user.uid,
    displayName: "",
    language: "",
    storiesStarted: [],
    storiesParticipant: [],
    storiesOpen: [],
    lastLogIn: new Date(),
    friends: [],
    points: 0,
    achievements: [],
  };
  const userDocRef = admin.firestore().collection("users").doc(user.uid).set(userDoc);
});
