import firebase from "../config/firebaseConfig";
const db = firebase.firestore();
export default db;

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
  let docRef = await db
    .collection("stories")
    .add(newStory)
    .catch(function (error) {
      console.error("Error adding document: ", error);
      return;
    });

  return docRef;
};

export const makeid = (length) => {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const getStoryText = (story) => {
  return story.storyParts.reduce((acc, curr) => acc + curr.text + " ", "");
};

export const getStorySignature = (story) => {
  return story.storyParts.reduce((acc, curr) => acc + curr.author + " ", "");
};
