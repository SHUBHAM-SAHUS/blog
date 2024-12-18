'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
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
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const validateForm = () => {
    const newErrors: { username?: string; password?: string } = {};

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
      const user = await login(credentials.username, credentials.password);
      if (user) {
        debugger
        const updatedUser = { ...user, password: credentials.password };
        Cookies.set('user', JSON.stringify(updatedUser));
        dispatch(setLogin(user));
        router.push(`/dashboard/${user.username}`);
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '1rem' }}>
      <h2>Login</h2>
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
          input: { color: '#000000' },
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
        variant="filled"
        sx={{
          input: { color: '#000000' },
          marginTop: '1rem',
        }}
      />
      <Button
        onClick={handleLogin}
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: '1rem' }}
      >
        Log In
      </Button>
    </div>
  );
};

export default LoginTemplate;
