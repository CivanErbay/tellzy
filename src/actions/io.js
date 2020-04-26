import firebase from "../config/firebaseConfig";
const db = firebase.firestore();
const auth = firebase.auth();

export const getUserRef = async (userId) => {
  let userRef = await db
    .collection("users")
    .doc(userId)
    .get()
    .catch(function (error) {
      console.log("Error getting document:", error);
      return null;
    });

  return userRef;
};

export const getUserData = async (userId) => {
  let userRef = await getUserRef(userId);
  if (userRef.exists) {
    return userRef.data();
  } else {
    console.log(userId, "Has no user doc!");
    return null;
  }
};

export const getStoryRef = async (storyId) => {
  let storyRef = await db
    .collection("stories")
    .doc(storyId)
    .get()
    .catch(function (error) {
      console.log("Error getting document:", error);
      return null;
    });

  return storyRef;
};

export const getStory = async (storyId) => {
  let storyRef = await getStoryRef(storyId);
  if (storyRef.exists) {
    return storyRef.data();
  } else {
    console.log(storyId, "There is no such story");
  }
};

export const queryAllStories = async (query) => {
  return (
    db
      .collection("stories")
      // .where(query)
      // .orderBy("createdOn", "desc") // no createdOn data yet
      .limit(10)
      .get()
      .then(function (querySnapshot) {
        let ids = querySnapshot.docs.map((doc) => doc.id);
        return ids;
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      })
  );
};

export const addStory = async (newStory) => {
  const { title, text } = newStory;
  const firstParticipant = {
    uid: auth.currentUser.uid,
    displayName: auth.currentUser.displayName,
    isSubmitted: true,
  };

  const firstPart = {
    createdBy: firstParticipant,
    submittedOn: new Date(),
    text,
    comment: "",
  };

  const story = {
    title,
    createdOn: new Date(),
    createdBy: firstParticipant,
    participants: [firstParticipant],
    description: "",
    language: "en",
    lastEdit: new Date(),
    customization: {},
    isFinished: false,
    finishedText: text,
    parts: [firstPart],
  };

  const docRef = await db
    .collection("stories")
    .add(story)
    .catch(function (error) {
      console.error("Error adding document: ", error);
      return;
    });

  // Also set this story for the user
  db.collection("users")
    .doc(auth.currentUser.uid)
    .update({ storiesParticipant: firebase.firestore.FieldValue.arrayUnion(docRef.id) })
    .then((res) => {
      // console.log(`Document written at ${res.updateTime} for ${user.uid}`);
    });

  return { ...story, id: docRef.id };
};

export const addStoryPart = async (storyId, text, userPublic) => {
  // TODO as backend function
  const part = {
    createdBy: userPublic,
    submittedOn: new Date(),
    text,
    comment: "",
  };

  db.collection("stories")
    .doc(storyId)
    .update({ lastEdit: new Date(), parts: firebase.firestore.FieldValue.arrayUnion(part) })
    .then((res) => {
      // console.log(`Document written at ${res.updateTime} for ${user.uid}`);
    });

  // Also set this story for the user
  db.collection("users")
    .doc(auth.currentUser.uid)
    .update({ storiesParticipant: firebase.firestore.FieldValue.arrayUnion(storyId) })
    .then((res) => {
      // console.log(`Document written at ${res.updateTime} for ${user.uid}`);
    });
};

export const checkIsUserParticipant = (story, uid) => {
  const isParticipant = story.participants.some((participant) => participant.uid === uid);
  return isParticipant;
};

export const checkIsUserSubmitted = (story, uid) => {
  const isSubmitted = story.participants.some(
    (participant) => participant.uid === uid && participant.isSubmitted
  );
  return isSubmitted;
};

export const getStoryLink = (storyId) => {
  return `https://tellzy.web.app/story/${storyId}`;
};

export const getStoryText = (story) => {
  return story.storyParts.reduce((acc, curr) => acc + curr.text + " ", "");
};

export const getStorySignature = (story) => {
  return story.storyParts.reduce((acc, curr) => acc + curr.author + " ", "");
};

export default db;
