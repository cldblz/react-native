import { createSlice } from "@reduxjs/toolkit";
import {
  writeDataToFirestore,
  getPostsFromFirestore,
  updateDataInFirestore,
} from "./postsOperations";

const initialState = {
  posts: [],
  isLoading: false,
  error: null,
  filter: "",
};

export const postsSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setPosts: (state, { payload }) => ({
      ...state,
      posts: payload.posts,
      isLoading: payload.isLoading,
      error: payload.error,
      filter: payload.filter,
    }),
  },
});
