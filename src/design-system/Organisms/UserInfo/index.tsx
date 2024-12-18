'use client'
import React from 'react';
import { Box, Avatar, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const UserInfo: React.FC<any> = ({ user }) => {
  const router = useRouter();

  console.log("currr",user)
  const handleEditClick = () => {
    if (user?.username) {
      router.push(`/dashboard/${user?.username}/edit`); // Route to the EditProfile page dynamically
    }
  };

  const handelAddPost = () => {
    router.push(`/post`);
  };

  if (!user) {
    return <Typography variant="body2">User not found</Typography>;
  }

  return (
    <Box
      sx={{
        padding: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid #a17fff',
        borderRadius: "20px",
       
      }}
    >
      <Avatar
        alt={user.fullname}
        src={user.profile_image || '/default-avatar.png'}
        sx={{ width: 100, height: 100, marginBottom: 2 }}
      />
      <Typography variant="h6" align="center">
        {user.fullname}
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        {user.status}...
      </Typography>
      <Button
        variant="outlined"
        sx={{ marginTop: 2 }}
        onClick={handleEditClick}
      >
        Edit Account
      </Button>
      <Button variant="outlined" sx={{ marginTop: 2 }} onClick={handelAddPost}>
        Add Post
      </Button>
    </Box>
  );
};

export default UserInfo;
