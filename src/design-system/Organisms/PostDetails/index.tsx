'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  List,
  ListItem,
  Divider,
} from '@mui/material';
import { useCreateComments, useGetFetchPosts } from '@/hooks/API';

const PostDetails: React.FC<any> = ({ user }) => {
  const [search, setSearch] = useState<string>('');
  const [comments, setComments] = useState<{ [key: string]: string }>({});
  const [updatedPosts, setUpdatedPosts] = useState<any[]>([]);

  const { posts, isLoading } = useGetFetchPosts(user?.id ?? '');
  const { createComment, createCommentIsLoading } = useCreateComments();

  useEffect(() => {
    if (posts) {
      setUpdatedPosts(posts);
    }
  }, [posts]);

  const handlePostComment = (postId: string) => {
    const comment = comments[postId];
    if (!comment.trim()) return;

    const payload = {
      post_id: postId,
      user_id: user?.id ?? '',
      content: comment,
    };

    createComment(payload);

    setUpdatedPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: Date.now().toString(),
                  post_id: postId,
                  user_id: user?.id ?? '',
                  username: user?.fullname ?? 'Anonymous',
                  createdAt: new Date().toISOString(),
                  content: comment,
                },
              ],
            }
          : post,
      ),
    );

    setComments((prevState) => ({ ...prevState, [postId]: '' }));
  };

  const sortedPosts =
    updatedPosts
      ?.filter((post) => post.createdAt)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ) || [];

  const filteredPosts = sortedPosts.filter((post) =>
    post.content?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Box sx={{ flex: 1, padding: 2 }}>
      <Typography
        variant="h5"
        sx={{
          marginBottom: 2,
          color: '#000',
          textAlign: 'center',
          fontWeight: 600,
        }}
      >
        Post Details
      </Typography>
      <TextField
        label="Search Posts"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          input: { color: '#333' },
          marginBottom: 2,
        }}
      />
      <Box>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
            <CircularProgress />
          </Box>
        ) : filteredPosts?.length > 0 ? (
          filteredPosts.map((post) => (
            <Box
              key={post.id}
              sx={{
                marginBottom: 3,
                padding: 3,
                border: '1px solid #ddd',
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: '#000',
                  marginBottom: 1,
                  fontWeight: 600,
                }}
              >
                {post.content}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: '#333', marginBottom: 2 }}
              >
                {new Date(post.createdAt).toLocaleString()}
              </Typography>
              <Divider sx={{ marginY: 2 }} />
              <Typography
                variant="subtitle1"
                sx={{ color: '#000', fontWeight: 600 }}
              >
                Comments
              </Typography>
              <List sx={{ padding: 0 }}>
                {post.comments?.map((comment: any) => (
                  <ListItem
                    key={comment.id}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      padding: '10px 0',
                      borderBottom: '1px solid #eee',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        alignItems: 'center',
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          color: '#000',
                          fontWeight: 600,
                        }}
                      >
                        {comment.username}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#555',
                          fontWeight: 600,
                          fontSize: '0.875rem',
                        }}
                      >
                        {new Date(comment.createdAt).toLocaleString()}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#000',
                        fontSize: '1rem',
                        marginTop: 1,
                      }}
                    >
                      {comment.content}
                    </Typography>
                  </ListItem>
                ))}
              </List>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  marginTop: 2,
                }}
              >
                <TextField
                  label="Add a comment"
                  variant="outlined"
                  sx={{
                    flex: 1,
                    input: { color: '#333' },
                  }}
                  fullWidth
                  value={comments[post.id] || ''}
                  onChange={(e) =>
                    setComments((prev) => ({
                      ...prev,
                      [post.id]: e.target.value,
                    }))
                  }
                />
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#1976d2',
                    '&:hover': { backgroundColor: '#155a9d' },
                  }}
                  onClick={() => handlePostComment(post.id)}
                  disabled={createCommentIsLoading}
                >
                  {createCommentIsLoading ? (
                    <CircularProgress size={24} color="secondary" />
                  ) : (
                    'Post Comment'
                  )}
                </Button>
              </Box>
            </Box>
          ))
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '50vh',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: '#888',
                fontSize: '1.2rem',
                fontWeight: 600,
                textAlign: 'center',
              }}
            >
              Post Not Available
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PostDetails;
