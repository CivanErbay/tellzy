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
  const firstPart = {
    createdBy: auth.currentUser.uid,
    submittedOn: new Date(),
    text,
    comment: "",
  };

  const story = {
    title,
    createdOn: new Date(),
    createdBy: auth.currentUser.uid,
    participants: [auth.currentUser.uid],
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

  return docRef.id;
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
