const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

// create user doc on user register
exports.createUserDoc = functions.auth.user().onCreate((user) => {
  const userDoc = {
    uid: user.uid,
    displayName: user.displayName,
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
      console.log(`Document written at ${res.updateTime} for ${user.uid}`);
    });
});

// TODO record last user log in into user data

// user friends search
exports.userSearch = functions.https.onCall((data, context) => {
  const userSearchText = data.query;
  const uid = context.auth.uid;

  const userSearchResultsRef = admin
    .firestore()
    .collection("users")
    .where("displayName", ">=", userSearchText)
    // .where("displayName", "<=", userSearchText + "\uf8ff")
    // // .where("displayName", "==", true)
    .limit(5);

  userSearchResultsRef
    .get()
    .then((querySnapshot) => {
      return querySnapshot;
      // if (querySnapshot) {
      //   return querySnapshot.map((doc) => doc.data());
      // } else {
      //   return [];
      // }
    })
    .catch((err) => {
      return null;
    });
  // TODO only return relevant user data (displayName, lastLogIn...)

  // return { userSearchResults };
});
