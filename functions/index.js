const functions = require("firebase-functions");

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

  admin
    .firestore()
    .collection("users")
    .doc(user.uid)
    .set(userDoc)
    .then((res) => {
      console.log(`Document written at ${res.updateTime}`);
    });
});
