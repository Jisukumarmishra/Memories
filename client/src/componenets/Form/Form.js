import React, { useState } from 'react'
import { TextField, Button, Typography, Paper, Box } from '@mui/material'
import { useDispatch } from 'react-redux'
import { createPost } from '../../actions/posts'
const Form = () => {
  const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' })
  
  const dispatch = useDispatch();


  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createPost(postData));
    console.log(postData)
  }

  const clear = () => {
    setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' })
  }

  // Pure JavaScript File Reader (No extra library needed)
  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPostData({ ...postData, selectedFile: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Paper sx={{ padding: '16px' }}>
      <Box component="form" autoComplete="off" noValidate onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Typography variant="h6" align="center">Creating a Memory</Typography>
        <TextField name="creator" label="Creator" variant="outlined" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
        <TextField name="title" label="Title" variant="outlined" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" label="Message" variant="outlined" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField name="tags" label="Tags" variant="outlined" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value })} />
        
        <input type="file" onChange={handleFileUpload} />

        <Button variant="contained" type="submit" fullWidth sx={{ backgroundColor: '#3f51b5' }}>SUBMIT</Button>
        <Button variant="contained" onClick={clear} fullWidth sx={{ backgroundColor: '#ff2b56' }}>CLEAR</Button>
      </Box>
    </Paper>
  )
}

export default Form