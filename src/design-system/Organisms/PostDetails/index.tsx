'use client'
import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  List,
  ListItem,
} from '@mui/material';
import { useCreateComments, useGetFetchPosts } from '@/hooks/API';

const PostDetails: React.FC<any> = ({ user }) => {
  const [search, setSearch] = useState<string>(''); // State for search input
  const [comments, setComments] = useState<{ [key: string]: string }>({});
  const [updatedPosts, setUpdatedPosts] = useState<any[]>([]); // Local state for posts

  const { posts, isLoading } = useGetFetchPosts(user?.id ?? '');
  const { createComment, createCommentIsLoading } = useCreateComments();


    
     useEffect(() => {
       if (posts) {
         setUpdatedPosts(posts);
       }
     }, [posts]);

     // Handle posting a new comment
     const handlePostComment = (postId: string) => {
       const comment = comments[postId];
         if (!comment.trim()) return; // Don't allow empty comments
         
         const payload = {
           post_id: postId,
           user_id: user?.id ?? '',
           content: comment,
         };

          


       createComment(payload);

       // Update the comments list of the post locally right away
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
                     content: comment,
                   },
                 ],
               }
             : post,
         ),
       );

       setComments((prevState) => ({ ...prevState, [postId]: '' })); // Clear the comment field after posting
     };

     // Sort posts by the createdAt date
     const sortedPosts =
       updatedPosts
         ?.filter((post) => post.createdAt)
         .sort(
           (a, b) =>
             new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
         ) || [];


  return (
    <Box sx={{ flex: 1, padding: 2 }}>
      {/* Search Input */}
      <TextField
        label="Search Posts"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          input: { color: '#000' },
          marginBottom: 2,
        }}
      />

      {/* Posts Section */}
      <Box>
        {isLoading ? (
          <CircularProgress />
        ) : sortedPosts?.length > 0 ? (
          sortedPosts
            ?.filter((post) =>
              post.content?.toLowerCase().includes(search.toLowerCase()),
            )
            .map((post) => (
              <Box
                key={post.id}
                sx={{
                  marginBottom: 3,
                  padding: 2,
                  border: '1px solid #ddd',
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" sx={{color:"#000"}}>{post.content}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {new Date(post.createdAt).toLocaleString()}
                </Typography>

                {/* Comments */}
                <List>
                  {post.comments?.map((comment: any) => (
                    <ListItem key={comment.id}>
                      <Typography variant="body2" sx={{color:"#000"}}>{comment.content}</Typography>
                    </ListItem>
                  ))}
                </List>

                {/* Add Comment */}
                <TextField
                  label="Add a comment"
                  variant="outlined"
                  sx={{ input: { color: '#000' }, marginBottom: 2 }}
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
                  sx={{ marginTop: 1 }}
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
            ))
        ) : (
          <Typography variant="body2">No One Posted Yet...</Typography>
        )}
      </Box>
    </Box>
  );
};

export default PostDetails;
