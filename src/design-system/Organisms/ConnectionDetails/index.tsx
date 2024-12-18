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
// import { User } from '../types/user';
import { useRouter } from 'next/navigation'; // For routing to the profile pag
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
  const router = useRouter(); // For routing to the profile page

  const filteredConnections = result?.filter(
    (user) =>
      user?.fullname?.toLowerCase().includes(search.toLowerCase()) ||
      user?.username?.toLowerCase().includes(search.toLowerCase()),
  );

  // Handle navigating to the user's profile page
  const handleNavigateToProfile = (userId: string) => {
    router.push(`/profile/${userId}`);
  };



  return (
    <Box sx={{ width: 300, padding: 2 }}>
      {/* Search for connections */}
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

      {/* Display filtered connections */}
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {filteredConnections?.map((user) => (
          <Grid
            item
            xs={12} // Full width on extra small screens
            sm={6} // Two items per row on small screens
            md={4} // Three items per row on medium screens and above
            key={user.id}
          >
            <Box
              sx={{
                textAlign:"center",
                cursor: 'pointer',
                backgroundColor: '#fff',
              }}
              onClick={() => handleNavigateToProfile(user.id)} // Navigate on click
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
