import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api";

// Get all posts
export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async () => {
    const { data } = await api.fetchPosts();
    return data;
  }
);

// Create post
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (post) => {
    const { data } = await api.createPost(post);
    return data;
  }
);

// Update post
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, post }) => {
    const { data } = await api.updatePost(id, post);
    return data;
  }
);

// Like post
export const likePost = createAsyncThunk(
  "posts/likePost",
  async (id) => {
    const { data } = await api.likePost(id);
    return data;
  }
);

// Delete post
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id) => {
    await api.deletePost(id);
    return id;
  }
);

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      // GET
      .addCase(getPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // CREATE
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })

      // UPDATE
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post._id === action.payload._id
        );

        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })

      // LIKE
      .addCase(likePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post._id === action.payload._id
        );

        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })

      // DELETE
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(
          (post) => post._id !== action.payload
        );
      });
  },
});

export default postsSlice.reducer;