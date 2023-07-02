import { authSlice } from "./authReducer";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/config";
const { updateUserProfile, signOut, authStateChange } = authSlice.actions;

export const authSignUpUser =
  ({ login, mail, password, avatar }) =>
  async (dispatch, getState) => {
    try {
      // console.log(getMethods(auth));

      await createUserWithEmailAndPassword(auth, mail, password);
      // await db.auth().createUserWithEmailAndPassword(mail, password);
      const user = await auth.currentUser;
      console.log("log from authSignUpUser", user);

      await updateProfile(user, {
        displayName: login,
        email: mail,
        photoURL: avatar,
      });

      // await user.updateProfile({
      //   displayName: login,
      //   email: mail,
      //   photoURL: avatar,
      // });
      const { uid, displayName, email, photoURL } = await auth.currentUser;

      const userUpdateProfile = {
        login: displayName,
        userId: uid,
        email: email,
        avatar: photoURL,
      };

      console.log("log from authSignUpUser", userUpdateProfile);
      dispatch(updateUserProfile(userUpdateProfile));
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = await auth.currentUser;
      // console.log("log from authSignInUser", user);

      // const user = await db.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  signOut(auth)
    .then(() => {
      console.log("Sign-out successful");
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  try {
    await db.auth().onAuthStateChanged((user) => {
      if (user) {
        const userUpdateProfile = {
          userId: user.uid,
          login: user.displayName,
          avatar: user.photoURL,
          email: user.email,
        };
        dispatch(authStateChange({ stateChange: true }));
        dispatch(updateUserProfile(userUpdateProfile));
      }
    });
  } catch (error) {
    console.log("error.message", error.message);
  }
};
