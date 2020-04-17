import firebase, { db } from "../config/firebaseConfig";

export const getStory = async (storyId) => {
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
