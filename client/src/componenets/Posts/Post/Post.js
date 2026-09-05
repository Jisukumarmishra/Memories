import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
} from '@mui/material';

import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { formatDistanceToNow } from 'date-fns';
import { useDispatch } from 'react-redux';

import { likePost, deletePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();

  return (
    <Card
      sx={{
        position: 'relative',
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={
          post.selectedFile ||
          'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
        }
        alt={post.title}
        sx={{
          objectFit: 'cover',
        }}
      />

      {/* Creator + Date */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          padding: 2,
          color: 'white',
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)',
        }}
      >
        <Typography variant="h6">
          {post.creator}
        </Typography>

        <Typography variant="body2">
          {formatDistanceToNow(new Date(post.createdAt), {
            addSuffix: true,
          })}
        </Typography>
      </Box>

      {/* Edit Button */}
      <Box
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
        }}
      >
        <Button
          sx={{ color: 'white', minWidth: 'auto' }}
          size="small"
          onClick={() => setCurrentId(post._id)}
        >
          <MoreHorizIcon />
        </Button>
      </Box>

      {/* Tags */}
      <Box sx={{ px: 2, pt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          {post.tags?.map((tag) => `#${tag} `)}
        </Typography>
      </Box>

      {/* Title */}
      <Typography
        sx={{ px: 2, pt: 1 }}
        gutterBottom
        variant="h5"
        component="h2"
      >
        {post.title}
      </Typography>

      {/* Message */}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.message}
        </Typography>
      </CardContent>

      {/* Actions */}
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(likePost(post._id))}
          startIcon={<ThumbUpAltIcon />}
        >
          Like {post.likeCount}
        </Button>

        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(deletePost(post._id))}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
