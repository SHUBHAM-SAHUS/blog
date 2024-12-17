'use client';

import React from 'react';
// import LeftPanel from '@/components/common/LeftPanel';
// import MiddlePanel from '@/components/common/MiddlePanel';
// import RightPanel from '@/components/common/RightPanel';
import { Box, Button, Container, Typography } from '@mui/material';
import { RootState } from '@/lib/redux/store';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useUserList } from '@/hooks/API';
import { UserInfo } from '@/design-system/Organisms';
import PostDetails from '@/design-system/Organisms/PostDetails';
import ConnectionDetails from '@/design-system/Organisms/ConnectionDetails';
// import useGetAllUsers from '@/hooks/useGetUsers';

interface User {
  id: string;
  username: string;
  email: string;
  fullname: string;
  status: string;
  profile_image: string;
  [key: string]: any; // Add for additional properties
}

const UserDashboard: React.FC = () => {
    //   const { users } = useGetAllUsers(); // Assuming this returns an array of User objects
  const { users, isAllProfileTagsLoading, refetchUserList } = useUserList();
  

  console.log('users', users);

  const router = useRouter();
  const user = useSelector(
    (state: RootState) => state.auth.user as User | null,
  );

  if (!user) {
    return (
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh',
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            You need to log in to view your dashboard
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 3 }}>
            Please log in to access your personalized content and features.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push('/login')}
            sx={{ width: '200px' }}
          >
            Go to Login
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <UserInfo user={user} />
      <PostDetails user={user} />
      <ConnectionDetails connections={users} />
    </Box>
  );
};

export default UserDashboard;
