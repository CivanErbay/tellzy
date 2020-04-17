import firebase, { db, auth } from "../config/firebaseConfig";

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
