// src/app/dashboard/components/RightPanel.tsx
import React, { useState } from 'react';
import {
  Box,
  TextField,
  List,
  ListItem,
  Avatar,
  Typography,
  Grid,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { User } from '@/utils/interfaces';

const ConnectionDetails = ({ connections }: { connections?: User[] }) => {
  const userConnections = useSelector(
    (state: any) => state.auth.user.connections,
  );
  const result = connections?.filter((connection) =>
    userConnections.includes(connection.id),
  );

  const [search, setSearch] = useState('');
  const router = useRouter();

  const filteredConnections = result?.filter(
    (user) =>
      user?.fullname?.toLowerCase().includes(search.toLowerCase()) ||
      user?.username?.toLowerCase().includes(search.toLowerCase()),
  );

  const handleNavigateToProfile = (userId: string) => {
    router.push(`/profile/${userId}`);
  };

  return (
    <Box sx={{ width: 300, padding: 2 }}>
      <TextField
        label="Search Users"
        variant="outlined"
        fullWidth
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          input: { color: '#000000' },
          marginTop: '1rem',
        }}
      />
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {filteredConnections?.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Box
              sx={{
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: '#fff',
              }}
              onClick={() => handleNavigateToProfile(user.id)}
            >
              <Avatar
                alt={user.fullname}
                src={user.profile_image}
                sx={{ width: 40, height: 40 }}
              />
              <Box sx={{ marginLeft: 2 }}>
                <Typography variant="body1">{user.fullname}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {user.username}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ConnectionDetails;
