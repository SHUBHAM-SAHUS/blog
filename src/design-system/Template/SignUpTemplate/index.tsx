'use client';

import React, { useState } from 'react';
import { Container, Typography, Box, Alert } from '@mui/material';
import { ButtonComponent, InputComponent } from '@/design-system/Atoms';
import useAuthService from '@/hooks/API/useAuthService';

interface FormData {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

interface Errors {
  fullName?: string;
  username?: string;
  email?: string;
  password?: string;
}

const SignUpTemplate: React.FC = () => {
  const { signUp } = useAuthService();

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    username: '',
    email: '',
    password: '',
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

    debugger
    if (validateForm()) {
      const { fullName, username, email, password } = formData;
      debugger
      signUp(username, password, email, fullName);
    }
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
        <ButtonComponent
          type="submit"
          label="Sign Up"
          // isLoading={signUpLoading}
          variant="contained"
          color="primary"
          fullWidth
        />
      </Box>
    </Container>
  );
};

export default SignUpTemplate;
