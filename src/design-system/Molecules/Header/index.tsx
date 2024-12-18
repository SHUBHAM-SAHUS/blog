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
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link href="/" passHref style={{ textDecoration: 'none' }}>
              <Typography
                variant="h6"
                sx={{ cursor: 'pointer', color: 'white', fontSize: '19px' }}
              >
                Home
              </Typography>
            </Link>
            {user?.username && (
              <Link
                href={`/dashboard/${user.username}`}
                style={{ textDecoration: 'none' }}
                passHref
              >
                <Typography
                  variant="h6"
                  sx={{ cursor: 'pointer', color: 'white', fontSize: '19px' }}
                >
                  My Dashboard
                </Typography>
              </Link>
            )}
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {user ? (
              <>
                <Typography
                  variant="body1"
                  sx={{ color: 'white', alignSelf: 'center' }}
                >
                  Hello, {user?.fullname}
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleLogout}
                  sx={{
                    backgroundColor: 'white',
                    color: '#a17fff',
                    fontWeight: '500',
                    textTransform: 'capitalize',
                    '&:hover': {
                      color: 'white',
                    },
                  }}
                >
                  Logout{' '}
                  <LogoutIcon sx={{ width: '14px', marginLeft: '4px' }} />
                </Button>
              </>
            ) : (
              <>
                <Link href="/signup" passHref>
                  <Button variant="outlined" color="inherit">
                    Sign Up
                  </Button>
                </Link>
                <Link href="/login" passHref>
                  <Button variant="outlined" color="inherit">
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
