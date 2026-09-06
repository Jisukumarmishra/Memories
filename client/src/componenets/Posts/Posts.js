import React, { useEffect } from "react";
import { Grid, CircularProgress, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import Post from "./Post/Post";
import { getPosts } from "../../redux/reducers/slice/postSlice";

const Posts = ({ setCurrentId }) => {
  const dispatch = useDispatch();

  const { posts, status, error } = useSelector((state) => state.posts);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getPosts());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <CircularProgress />;
  }

  if (status === "failed") {
    return (
      <Typography color="error">
        {error || "Something went wrong while loading posts."}
      </Typography>
    );
  }

  return (
    <Grid
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid
          key={post._id}
          size={{ xs: 12, sm: 6, md: 6 }}
        >
          <Post
            post={post}
            setCurrentId={setCurrentId}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;