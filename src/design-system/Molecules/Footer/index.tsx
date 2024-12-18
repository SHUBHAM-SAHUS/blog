import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#3f51b5', // Darker color for a modern look
        color: '#ffffff',
        width: '100%',
        position: 'fixed',
        bottom: '0',
        boxShadow:
          'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
        zIndex: 10,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 0',
          }}
        >
          <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
            &copy; 2024 My Dashboard. All rights reserved.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              fontSize: '0.9rem',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Privacy Policy
            </Typography>
            <Typography
              variant="body2"
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Terms of Service
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
