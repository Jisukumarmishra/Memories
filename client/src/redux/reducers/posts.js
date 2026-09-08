import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api"; 

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  const { data } = await api.fetchPosts();
  return data;
});

export const createPost = createAsyncThunk("posts/createPost", async (post) => {
  const { data } = await api.createPost(post);
  return data;
});

const postsSlice = createSlice({
  name: "posts",
  initialState: [], 
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH_ALL
      .addCase(getPosts.fulfilled, (state, action) => {
        return action.payload; 
      })
      // CREATE
      .addCase(createPost.fulfilled, (state, action) => {
        state.push(action.payload);
      });
  },
});

export default postsSlice.reducer;




// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import * as api from "../../../api"; // Ensure API path is correct

// // 1. ASYNC THUNKS (Ye aapke purane actions ko replace karenge)
// export const getPosts = createAsyncThunk("posts/getPosts", async () => {
//   const { data } = await api.fetchPosts();
//   return data;
// });

// export const createPost = createAsyncThunk("posts/createPost", async (post) => {
//   const { data } = await api.createPost(post);
//   return data;
// });

// export const updatePost = createAsyncThunk("posts/updatePost", async ({ id, updatedPost }) => {
//   const { data } = await api.updatePost(id, updatedPost);
//   return data;
// });

// export const likePost = createAsyncThunk("posts/likePost", async (id) => {
//   const { data } = await api.likePost(id);
//   return data;
// });

// export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
//   await api.deletePost(id);
//   return id;
// });

// // 2. SLICE (Ye aapke purane switch-case reducer ko replace karega)
// const postsSlice = createSlice({
//   name: "posts",
//   initialState: [], // Purana format: posts = []
//   reducers: {},
  
//   extraReducers: (builder) => {
//     builder
//       // FETCH_ALL
//       .addCase(getPosts.fulfilled, (state, action) => {
//         return action.payload; 
//       })
      
//       // CREATE
//       .addCase(createPost.fulfilled, (state, action) => {
//         state.push(action.payload); // RTK me array me direct push kar sakte hain
//       })
      
//       // UPDATE
//       .addCase(updatePost.fulfilled, (state, action) => {
//         return state.map((post) =>
//           post._id === action.payload._id ? action.payload : post
//         );
//       })
      
//       // LIKE
//       .addCase(likePost.fulfilled, (state, action) => {
//         return state.map((post) =>
//           post._id === action.payload._id ? action.payload : post
//         );
//       })
      
//       // DELETE
//       .addCase(deletePost.fulfilled, (state, action) => {
//         return state.filter((post) => post._id !== action.payload);
//       });
//   },
// });

// export default postsSlice.reducer;













// // import { createSlice } from "@reduxjs/toolkit";

// // const postsSlice = createSlice({
// //   name: "posts",

// //   initialState: [],

// //   reducers: {},
// // });

// // export default postsSlice.reducer;