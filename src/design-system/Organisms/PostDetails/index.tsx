import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  List,
  ListItem,
} from '@mui/material';
import { MiddlePanelProps } from '@/utils/interfaces';
import { useCreateComments, useGetFetchPosts } from '@/hooks/API';
// import { Post } from '../types/post';
// import { MiddlePanelProps } from '../types/middlePanel';
// import useFetchUserPosts from '@/hooks/useFetchUserPosts';
// import { useCreateComments } from '@/hooks/API';

const PostDetails: React.FC<any> = ({ user }) => {
  //   const { createComment, errorComment, loadingComment } = useCreateComment();
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
      <TextField
        label="Search Posts"
        variant="outlined"
        fullWidth
        onChange={(e) => setSearch(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Box>
        {isLoading ? (
          <CircularProgress sx={{ marginBottom: 2 }} />
        ) : sortedPosts?.length > 0 ? (
          sortedPosts
            ?.filter((post) =>
              post.content.toLowerCase().includes(search.toLowerCase()),
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
                <Typography variant="h6">{post.content}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {new Date(post.createdAt).toLocaleString()}
                </Typography>

                {/* Display comments */}
                <List>
                  {post.comments.map((comment: any) => (
                    <ListItem key={comment.id}>
                      <Typography variant="body2">{comment.content}</Typography>
                    </ListItem>
                  ))}
                </List>

                {/* New Comment Input */}
                <TextField
                  label="Add a comment"
                  variant="outlined"
                  fullWidth
                  value={comments[post.id] || ''}
                  onChange={(e) =>
                    setComments((prevState) => ({
                      ...prevState,
                      [post.id]: e.target.value,
                    }))
                  } // Update specific post's comment
                  sx={{ marginTop: 2 }}
                />
                <Button
                  variant="contained"
                  sx={{ marginTop: 1 }}
                  onClick={() => handlePostComment(post?.id)}
                >
                  {createCommentIsLoading ? (
                    <CircularProgress size={24} color="secondary" />
                  ) : (
                    'Post Comment'
                  )}
                </Button>

                {!createCommentIsLoading && (
                  <Typography color="error" sx={{ marginTop: 2 }}>
                    {/* Error posting comment: {errorComment} */}
                  </Typography>
                )}
              </Box>
            ))
        ) : (
          <Typography variant="body2">No One Posted Yet...</Typography>
        )}
      </Box>
      {/* <Button variant="outlined" sx={{ marginTop: 2 }} onClick={}>
        Load More
      </Button> */}
    </Box>
  );
};

export default PostDetails;
