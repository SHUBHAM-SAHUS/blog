'use client';

import React, { useState } from 'react';
import {
  TextField,
  Button,
  CircularProgress,
  Box,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { useCreatePost } from '@/hooks/API';

const CreatePostTemplate = () => {
  const { createPost, createPostIsLoading } = useCreatePost();
  const [content, setContent] = useState('');
  const user = useSelector((state: RootState) => state.auth.user);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user?.id) {
      const payload = {
        user_id: user?.id,
        content,
        createdAt: new Date().toISOString(),
        comments: [],
      };
      createPost(payload);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Create a New Post
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          multiline
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post here..."
          sx={{
            '& .MuiInputBase-input': {
              color: '#000000',
            },
          }}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={createPostIsLoading || !content.trim()}
          >
            {createPostIsLoading ? (
              <CircularProgress size={24} />
            ) : (
              'Create Post'
            )}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CreatePostTemplate;
