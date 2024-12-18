'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Stack,
  IconButton,
  CircularProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useAuthService from '@/hooks/API/useAuthService';
import { InputComponent } from '@/design-system/Atoms';
import Cookies from 'js-cookie';
import { login as setLogin } from '@/lib/redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

interface Credentials {
  username: string;
  password: string;
}

const LoginTemplate: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { login } = useAuthService();
  const [credentials, setCredentials] = useState<Credentials>({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: { username?: string; password?: string } = {};

    if (!credentials.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!credentials.password) {
      newErrors.password = 'Password is required';
    } else if (credentials.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleLogin = async () => {
    if (validateForm()) {
      setIsLoading(true);
      const user = await login(credentials.username, credentials.password);
      setIsLoading(false);
      if (user) {
        const updatedUser = { ...user, password: credentials.password };
        Cookies.set('user', JSON.stringify(updatedUser));
        dispatch(setLogin(user));
        router.push(`/dashboard/${user.username}`);
      }
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f4f4f4',
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          backgroundColor: '#fff',
          padding: 3,
          borderRadius: 3,
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          position: 'relative',
        }}
      >
        <IconButton
          onClick={() => router.back()}
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            color: '#000',
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Typography
          variant="h4"
          gutterBottom
          sx={{
            textAlign: 'center',
            fontWeight: 600,
            color: '#000',
          }}
        >
          Login
        </Typography>

        <Stack
          spacing={2}
          component="form"
          onSubmit={(e) => e.preventDefault()}
        >
          <InputComponent
            label="Username"
            name="username"
            value={credentials.username}
            onChange={handleInputChange}
            errorText={errors.username}
            fullWidth
            required
            variant="outlined"
            sx={{
              input: { color: '#000' }, // Ensure text inside the input is black
              label: { color: '#000' }, // Ensure label text is black
            }}
          />

          <InputComponent
            label="Password"
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleInputChange}
            errorText={errors.password}
            fullWidth
            required
            variant="outlined"
            sx={{
              input: { color: '#000' }, // Ensure text inside the input is black
              label: { color: '#000' }, // Ensure label text is black
            }}
          />

          <Button
            onClick={handleLogin}
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading}
            sx={{
              padding: '12px 16px',
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '1rem',
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} sx={{ color: '#fff' }} />
            ) : (
              'Log In'
            )}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default LoginTemplate;
