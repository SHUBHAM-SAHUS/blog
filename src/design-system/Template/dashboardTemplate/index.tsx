'use client';

import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { RootState } from '@/lib/redux/store';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useUserList } from '@/hooks/API';
import { UserInfo } from '@/design-system/Organisms';
import PostDetails from '@/design-system/Organisms/PostDetails';
import Grid from '@mui/material/Grid';
import ConnectionDetails from '@/design-system/Organisms/ConnectionDetails';

interface User {
  id: string;
  username: string;
  email: string;
  fullname: string;
  status: string;
  profile_image: string;
  [key: string]: any;
}

const UserDashboard: React.FC = () => {
  const { users, isAllProfileTagsLoading, refetchUserList } = useUserList();
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
    <Box sx={{ display: 'flex', gap: 2, marginTop: '2rem' }}>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item sm={6} md={3}>
            <UserInfo user={user} />
          </Grid>
          <Grid item sm={6} md={6}>
            <PostDetails user={user} />
          </Grid>
          <Grid item sm={6} md={3}>
            <ConnectionDetails connections={users} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default UserDashboard;
