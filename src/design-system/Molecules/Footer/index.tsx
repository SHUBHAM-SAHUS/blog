import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        padding: 3,
        textAlign: 'center',
        backgroundColor: '#f1f1f1',
        width: '100%',
        position: 'fixed',
        bottom: '0',
        boxShadow:
          'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
      }}
    >
      <Typography variant="body2" color="#4e4e4e">
        &copy; 2024 My Dashboard. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
