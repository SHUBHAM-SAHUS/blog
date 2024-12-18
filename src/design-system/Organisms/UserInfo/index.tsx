'use client';
import React from 'react';
import { Box, Avatar, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const UserInfo: React.FC<any> = ({ user }) => {
  const router = useRouter();

  const handleEditClick = () => {
    if (user?.username) {
      router.push(`/dashboard/${user?.username}/edit`);
    }
  };

  const handelAddPost = () => {
    router.push(`/post`);
  };

  if (!user) {
    return (
      <Typography
        variant="body2"
        sx={{ textAlign: 'center', marginTop: '2rem', color: '#000' }}
      >
        User not found
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid #a17fff',
        borderRadius: '20px',
        maxWidth: '400px',
        margin: '0 auto',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* User Profile Heading */}
      <Typography
        variant="h4"
        sx={{
          marginBottom: 2,
          fontWeight: 700,
          textAlign: 'center',
          color: '#000',
        }}
      >
        User Profile
      </Typography>

      {/* User Info */}
      <Avatar
        alt={user.fullname}
        src={user.profile_image || '/default-avatar.png'}
        sx={{
          width: 100,
          height: 100,
          marginBottom: 2,
          borderRadius: 2, // Makes the image square
        }}
      />
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: '#000', // Ensure text is black
        }}
      >
        {user.fullname}
      </Typography>
      <Typography
        variant="body2"
        align="center"
        sx={{
          marginBottom: 1,
          color: '#000', // Ensure text is black
        }}
      >
        {user.status}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          width: '100%',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleEditClick}
          sx={{
            flex: 1,
            backgroundColor: '#a17fff',
            '&:hover': { backgroundColor: '#8e6ce8' },
          }}
        >
          Edit Account
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handelAddPost}
          sx={{
            flex: 1,
            backgroundColor: '#ff8a65',
            '&:hover': { backgroundColor: '#e76b48' },
          }}
        >
          Add Post
        </Button>
      </Box>
    </Box>
  );
};

export default UserInfo;
