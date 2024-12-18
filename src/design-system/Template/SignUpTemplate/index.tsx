'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import { ButtonComponent, InputComponent } from '@/design-system/Atoms';
import useAuthService from '@/hooks/API/useAuthService';
import { SelectChangeEvent } from '@mui/material';
import { statusOptions } from '@/utils';

interface FormData {
  fullName: string;
  username: string;
  email: string;
  password: string;
  status: string;
}

interface Errors {
  fullName?: string;
  username?: string;
  email?: string;
  password?: string;
}

const SignUpTemplate: React.FC = () => {
  const { signUp } = useAuthService();
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    username: '',
    email: '',
    password: '',
    status: 'busy', // Default status
  });

  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = (): boolean => {
    const { fullName, username, email, password } = formData;
    const newErrors: Errors = {};

    if (!fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!username.trim()) newErrors.username = 'Username is required.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validateForm()) {
      const { fullName, username, email, password, status } = formData;
      signUp(username, password, email, fullName, status);
    }
  };

  const handleStatusChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      status: value === 'status' ? '' : value,
    }));
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
          maxWidth: 500,
          backgroundColor: '#fff',
          padding: 4,
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
          Sign Up
        </Typography>

        <form onSubmit={handleSignUp}>
          <Stack spacing={3}>
            <InputComponent
              label="Full Name"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              errorText={errors.fullName}
              fullWidth
              required
              variant="outlined"
              sx={{
                input: { color: '#000' },
              }}
            />

            <InputComponent
              label="Username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              errorText={errors.username}
              fullWidth
              required
              variant="outlined"
              sx={{
                input: { color: '#000' },
              }}
            />

            <InputComponent
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              errorText={errors.email}
              fullWidth
              required
              variant="outlined"
              sx={{
                input: { color: '#000' },
              }}
            />

            <InputComponent
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              errorText={errors.password}
              fullWidth
              required
              variant="outlined"
              sx={{
                input: { color: '#000' },
              }}
            />

            <FormControl fullWidth variant="outlined">
              <InputLabel id="status-label" sx={{ color: '#000' }}>
                Status
              </InputLabel>
              <Select
                labelId="status-label"
                label="Status"
                name="status"
                value={formData.status || 'status'}
                onChange={handleStatusChange}
                sx={{
                  color: '#000',
                  '.MuiOutlinedInput-notchedOutline': {
                    borderColor: '#000',
                  },
                  '.MuiMenuItem-root': {
                    color: '#000',
                  },
                }}
              >
                <MenuItem value="status" disabled>
                  Status...
                </MenuItem>
                {statusOptions.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    sx={{
                      color: '#000',
                    }}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <ButtonComponent
              type="submit"
              label="Sign Up"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                fontWeight: 600,
                textTransform: 'none',
              }}
            />
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default SignUpTemplate;
