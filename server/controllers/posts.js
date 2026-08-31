import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

// Get All Posts
export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get Single Post
export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No post with id: ${id}`);
    }
    const post = await PostMessage.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create Post
export const createPost = async (req, res) => {
  const post = req.body;

  try {
    const newPost = new PostMessage(post); // Fixed: added 'new' inside try block
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Update Post
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No post with id: ${id}`);
  }

  const updatedPostData = { creator, title, message, tags, selectedFile, _id: id };
  const updatedPost = await PostMessage.findByIdAndUpdate(id, updatedPostData, { new: true });

  res.json(updatedPost);
};

// Delete Post
export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No post with id: ${id}`);
  }

  await PostMessage.findByIdAndDelete(id);
  res.json({ message: 'Post deleted successfully.' });
};

// Like Post
export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No post with id: ${id}`);
  }

  const post = await PostMessage.findById(id);
  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    { likeCount: (post.likeCount || 0) + 1 },
    { new: true }
  );

  res.json(updatedPost);
};