'use client';

import React from 'react';
import {
  Box,
  Button,
  Typography,
  AppBar,
  Toolbar,
  Container,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/redux/store';
import { logout } from '@/lib/redux/slices/authSlice';
import Cookies from 'js-cookie';
import LogoutIcon from '@mui/icons-material/Logout';

const Header: React.FC = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = (): void => {
    Cookies.remove('user');
    dispatch(logout());
    router.push('/');
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: '#3f51b5',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Link href="/" passHref style={{ textDecoration: 'none' }}>
              <Typography
                variant="h6"
                sx={{
                  cursor: 'pointer',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '20px',
                }}
              >
                Home
              </Typography>
            </Link>
            {user?.username && (
              <Link
                href={`/dashboard/${user.username}`}
                passHref
                style={{ textDecoration: 'none' }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    cursor: 'pointer',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '20px',
                  }}
                >
                  My Dashboard
                </Typography>
              </Link>
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {user ? (
              <>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'white',
                    fontWeight: 500,
                  }}
                >
                   {user?.fullname}
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleLogout}
                  sx={{
                    backgroundColor: 'white',
                    color: '#3f51b5',
                    fontWeight: 600,
                    textTransform: 'capitalize',
                    '&:hover': {
                      backgroundColor: '#283593',
                      color: 'white',
                    },
                  }}
                >
                  Logout
                  <LogoutIcon
                    sx={{ width: '16px', height: '16px', marginLeft: '8px' }}
                  />
                </Button>
              </>
            ) : (
              <>
                <Link href="/signup" passHref>
                  <Button
                    variant="outlined"
                    sx={{
                      color: 'white',
                      borderColor: 'white',
                      textTransform: 'capitalize',
                      fontWeight: 600,
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                </Link>
                <Link href="/login" passHref>
                  <Button
                    variant="outlined"
                    sx={{
                      color: 'white',
                      borderColor: 'white',
                      textTransform: 'capitalize',
                      fontWeight: 600,
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
