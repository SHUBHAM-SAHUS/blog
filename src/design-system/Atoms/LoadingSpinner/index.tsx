import React, { useMemo } from 'react';
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface LoadingSpinnerProps extends CircularProgressProps {
  fullScreen?: boolean; // Flag to center the loader on the screen
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  fullScreen = true,
  size = 50,
  thickness = 4.0,
  color = 'primary',
  ...props
}) => {
  const spinner = useMemo(
    () => (
      <CircularProgress
        size={size}
        thickness={thickness}
        color={color}
        {...props}
      />
    ),
    [size, thickness, color, props],
  );

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: fullScreen ? '100vh' : 'auto',
        width: fullScreen ? '100vw' : 'auto',
        position: fullScreen ? 'fixed' : 'relative',
        top: fullScreen ? 0 : 'auto',
        left: fullScreen ? 0 : 'auto',
        zIndex: fullScreen ? 9999 : 'auto',
        backgroundColor: fullScreen
          ? 'rgba(255, 255, 255, 0.8)'
          : 'transparent', // Optional overlay for fullscreen
      }}
    >
      {spinner}
    </Box>
  );
};

export default LoadingSpinner;
