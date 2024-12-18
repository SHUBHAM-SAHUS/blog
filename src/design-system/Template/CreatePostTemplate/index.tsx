'use client';

import React, { useState } from 'react';
import {
  TextField,
  Button,
  CircularProgress,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { useCreatePost } from '@/hooks/API';

const CreatePostTemplate = () => {
  const { createPost, createPostIsLoading } = useCreatePost();
  const [content, setContent] = useState('');
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();

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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: 2,
        backgroundColor: '#f4f4f4',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 600,
          backgroundColor: '#fff',
          padding: 3,
          borderRadius: 2,
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          position: 'relative',
        }}
      >
        <IconButton
          onClick={() => router.back()}
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            color: '#000',
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Typography
          variant="h4"
          gutterBottom
          sx={{
            textAlign: 'center',
            fontWeight: 600,
            color: '#000',
          }}
        >
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
                color: '#000',
              },
              marginBottom: 2,
            }}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={createPostIsLoading || !content.trim()}
              sx={{
                padding: '8px 16px',
                fontWeight: 600,
                fontSize: '1rem',
                textTransform: 'none',
              }}
            >
              {createPostIsLoading ? (
                <CircularProgress size={24} sx={{ color: '#fff' }} />
              ) : (
                'Create Post'
              )}
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default CreatePostTemplate;
