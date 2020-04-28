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
  const { query } = data;
  const { uid } = context.auth;

  const userSearchResultsRef = admin
    .firestore()
    .collection("users")
    .where("displayName", ">=", query)
    // .where("displayName", "<=", userSearchText + "\uf8ff")
    // // .where("displayName", "==", true)
    .limit(5);

  userSearchResultsRef
    .get()
    .then((querySnapshot) => {
      if (querySnapshot) {
        return querySnapshot.map((doc) => doc.data());
      } else {
        return null;
      }
    })
    .catch((err) => {
      return null;
    });
  // TODO only return relevant user data (displayName, lastLogIn...)
});

// grant user access to story
exports.grantUserStoryEditAccess = functions.https.onCall(async (data, context) => {
  const { storyId, userPublic } = data;
  const { uid } = context.auth;
  userPublic = { ...userPublic, isSubmitted: false };

  await admin
    .firestore()
    .collection("stories")
    .doc(storyId)
    .update({ participants: admin.firestore.FieldValue.arrayUnion(userPublic) })
    .then((res) => {
      console.log(`Story updated for new user ${uid}`);
    })
    .catch((err) => {
      return { requestSucess: false };
    });

  await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .update({ storiesParticipant: admin.firestore.FieldValue.arrayUnion(storyId) })
    .then((res) => {
      console.log(`User updated for new story ${uid}`);
    })
    .catch((err) => {
      return { requestSucess: false };
    });

  return { requestSucess: true };
});

exports.addStoryPart = functions.https.onCall(async (data, context) => {
  const { storyPart, userPublic } = data;
  const { uid } = context.auth;
  userPublic = { ...userPublic, isSubmitted: true };

  await admin
    .firestore()
    .collection("stories")
    .doc(storyId)
    .update({ parts: admin.firestore.FieldValue.arrayUnion(storyPart) })
    .then((res) => {
      console.log(`Story updated for new user ${uid}`);
    })
    .catch((err) => {
      return { requestSucess: false };
    });

  await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .update({ storiesParticipant: admin.firestore.FieldValue.arrayUnion(storyId) })
    .then((res) => {
      console.log(`User updated for new story ${uid}`);
    })
    .catch((err) => {
      return { requestSucess: false };
    });

  return { requestSucess: true };
});
