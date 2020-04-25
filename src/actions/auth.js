import firebase from "../config/firebaseConfig";
const db = firebase.firestore();
const auth = firebase.auth();

// Initialize the FirebaseUI Widget using Firebase.
export const uiConfig = {
  // callbacks: {
  //   signInSuccessWithAuthResult: function (authResult, redirectUrl) {
  //     // User successfully signed in.
  //     // Return type determines whether we continue the redirect automatically
  //     // or whether we leave that to developer to handle.
  //     return true;
  //   },
  //   uiShown: function () {
  //     // The widget is rendered.
  //     // Hide the loader.
  //     document.getElementById("loader").style.display = "none";
  //   },
  // },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: "popup",
  signInSuccessUrl: "main",
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  // Terms of service url.
  tosUrl: "policy", // TODO
  // Privacy policy url.
  privacyPolicyUrl: "policy",
};

export const signIn = (credentials) => {
  auth
    .signInWithEmailAndPassword(credentials.email, credentials.password)
    .then(() => {
      console.log("log in success");
    })
    .catch((err) => {
      console.log("login error");
    });
};

export const signOut = () => {
  auth.signOut().then(() => {
    console.log("signed out");
  });
};

export const signUp = (newUser) => {
  auth.createUserWithEmailAndPassword(newUser.email, newUser.password).then((resp) => {
    return db
      .collection("users")
      .doc(resp.user.uid)
      .set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initials: newUser.firstName[0] + newUser.lastName[0],
      })
      .then(() => {
        console.log("user signed up");
      })
      .catch((err) => {
        console.log("Error in sign up");
      });
  });
};

export default auth;
