import firebase from "../config/firebaseConfig";
// const db = firebase.firestore();
// const auth = firebase.auth();

const functions = firebase.functions();
export default functions;

export const userSearch = async (query) => {
  let userSearchResults = await functions.httpsCallable("userSearch")({ query });
  return userSearchResults.data;
};

export const grantUserStoryEditAccess = async (storyId, userPublic) => {
  let res = await functions.httpsCallable("grantUserStoryEditAccess")({ storyId, userPublic });
  return res.data;
};
