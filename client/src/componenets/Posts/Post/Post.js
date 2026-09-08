import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Box } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { formatDistanceToNow } from 'date-fns';
import { useDispatch } from 'react-redux';

// Redux Toolkit import path (update this if your path is different)
import { likePost, deletePost } from '../../../redux/reducers/slice/postSlice';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();

  // Safely format the date using date-fns
  const formattedDate = post.createdAt 
    ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }) 
    : '';

  return (
    <Card sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'space-between', 
      borderRadius: '15px', 
      height: '100%', 
      position: 'relative' 
    }}>
      <CardMedia 
        sx={{ 
          height: 0, 
          paddingTop: '56.25%', 
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          backgroundBlendMode: 'darken' 
        }} 
        image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} 
        title={post.title} 
      />
      
      <Box sx={{ position: 'absolute', top: '20px', left: '20px', color: 'white' }}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">{formattedDate}</Typography>
      </Box>
      
      <Box sx={{ position: 'absolute', top: '20px', right: '20px', color: 'white' }}>
        <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}>
          <MoreHorizIcon fontSize="medium" />
        </Button>
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '20px' }}>
        <Typography variant="body2" color="textSecondary" component="h2">
          {post.tags?.map((tag) => `#${tag} `)}
        </Typography>
      </Box>
      
      <Typography sx={{ padding: '0 16px' }} gutterBottom variant="h5" component="h2">
        {post.title}
      </Typography>
      
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>
      
      <CardActions sx={{ padding: '0 16px 8px 16px', display: 'flex', justifyContent: 'space-between' }}>
        <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}>
          <ThumbUpAltIcon fontSize="small" sx={{ mr: 0.5 }} /> Like {post.likeCount} 
        </Button>
        <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
          <DeleteIcon fontSize="small" sx={{ mr: 0.5 }} /> Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;