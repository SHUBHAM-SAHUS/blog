'use client';

import React, { useState } from 'react';
// import { Container, Typography, Box, Alert } from '@mui/material';
import { ButtonComponent, InputComponent } from '@/design-system/Atoms';
import useAuthService from '@/hooks/API/useAuthService';
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Stack,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Container,
} from '@mui/material';
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
  status?: string;
}

const SignUpTemplate: React.FC = () => {
  const { signUp } = useAuthService();

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    username: '',
    email: '',
    password: '',
    status: 'status', // Default value for the status field
  });


  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' })); // Clear error for current input
  };

  const validateForm = (): boolean => {
    const { fullName, username, email, password } = formData;
    const newErrors: Errors = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    }

    if (!username.trim()) {
      newErrors.username = 'Username is required.';
    }

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
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    debugger;
    if (validateForm()) {
      const { fullName, username, email, password,status } = formData;
      debugger;
      signUp(username, password, email, fullName,status);
    }
  };

   const handleStatusChange = (e: SelectChangeEvent<string>) => {
     const value = e.target.value;
     setFormData((prevData) => ({
       ...prevData,
       status: value === 'status' ? '' : value, // Reset if "status" is selected
     }));
   };

  

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Sign Up
      </Typography>

      <Box
        component="form"
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        onSubmit={handleSignUp}
      >
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
            input: { color: '#000000' },
            marginTop: '1rem',
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
            input: { color: '#000000' },
            marginTop: '1rem',
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
            input: { color: '#000000' },
            marginTop: '1rem',
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
            input: { color: '#000000' },
            marginTop: '1rem',
          }}
        />
        <FormControl fullWidth variant="outlined">
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            label="Status"
            name="status"
            value={formData.status || 'status'}
            onChange={handleStatusChange}
            fullWidth
            sx={{
              color: 'black',
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: 'black',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'black',
              },
              '& .MuiSvgIcon-root': {
                color: 'black',
              },
            }}
          >
            <MenuItem
              value="status"
              disabled
              sx={{
                color: 'black',
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: 'black',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'black',
                },
                '& .MuiSvgIcon-root': {
                  color: 'black',
                },
              }}
            >
              Status...
            </MenuItem>
            {statusOptions.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                sx={{
                  color: 'black',
                  '.MuiOutlinedInput-notchedOutline': {
                    borderColor: 'black',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'black',
                  },
                  '& .MuiSvgIcon-root': {
                    color: 'black',
                  },
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
        />
      </Box>
    </Container>
  );
};

export default SignUpTemplate;
