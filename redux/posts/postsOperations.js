import {
  collection,
  addDoc,
  query,
  getDocs,
  where,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";

import { postsSlice } from "./postsSlice";
const { setPosts } = postsSlice.actions;

export const writeDataToFirestore = async () => {
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const getPostsFromFirestore = async () => {
  try {
    const snapshot = await getDocs(collection(db, "posts"));

    snapshot.forEach((doc) => console.log(`${doc.id} =>`, doc.data()));

    const posts = snapshot.map((doc) => ({ id: doc.id, data: doc.data() }));

    const postsSliceData = {
      posts: posts,
      isLoading: false,
      error: null,
      filter: "",
    };

    dispatch(setPosts(postsSliceData));

    return posts;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateDataInFirestore = async (collectionName, docId) => {
  try {
    const ref = doc(db, collectionName, docId);

    await updateDoc(ref, {
      age: 25,
    });
    console.log("document updated");
  } catch (error) {
    console.log(error);
  }
};
