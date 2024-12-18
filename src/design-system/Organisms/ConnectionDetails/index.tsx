'use client';

import React, { useState } from 'react';
import { Box, TextField, Grid, Avatar, Typography } from '@mui/material';
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

  // Provide a default empty array if `result` is undefined
  const filteredConnections =
    result?.filter(
      (user) =>
        user?.fullname?.toLowerCase().includes(search.toLowerCase()) ||
        user?.username?.toLowerCase().includes(search.toLowerCase()),
    ) || [];

  const handleNavigateToProfile = (userId: string) => {
    router.push(`/profile/${userId}`);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 400, padding: 2 }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: '#000',
          marginBottom: 2,
          textAlign: 'center',
        }}
      >
        User Connections
      </Typography>

      <TextField
        label="Search Connections"
        variant="outlined"
        fullWidth
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          input: { color: '#000' },
          marginBottom: 2,
        }}
      />

      {!result?.length && (
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
            Connections Not Available
          </Typography>
        </Box>
      )}

      {result?.length && filteredConnections.length === 0 && (
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
            Connection Not Found
          </Typography>
        </Box>
      )}

      {filteredConnections.length > 0 && (
        <Grid container spacing={2}>
          {filteredConnections.map((user) => (
            <Grid item xs={6} sm={4} key={user.id}>
              <Box
                onClick={() => handleNavigateToProfile(user.id)}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 2,
                  borderRadius: 2,
                  cursor: 'pointer',
                  backgroundColor: '#f9f9f9',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <Avatar
                  alt={user.fullname}
                  src={user.profile_image}
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: 2,
                    marginBottom: 1,
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    color: '#000',
                    textAlign: 'center',
                  }}
                >
                  {user.fullname}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#555',
                    textAlign: 'center',
                  }}
                >
                  {user.username}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ConnectionDetails;
