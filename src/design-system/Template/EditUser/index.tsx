'use client';

import React, { useEffect, useState } from 'react';
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
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { statusOptions } from '@/utils';
import { useCreatePost } from '@/hooks/API';

const EditProfile: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { updatePost, updatePostIsLoading } = useCreatePost();

  const [formData, setFormData] = useState({
    fullname: user?.fullname ?? '',
    username: user?.username ?? '',
    email: user?.email ?? '',
    status: user?.status ?? '',
    profile_image: user?.profile_image ?? '',
  });

  const [imagePreview, setImagePreview] = useState<string>(
    user?.profile_image || '',
  );
  const [validation, setValidation] = useState<string | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setFormData({
        fullname: user.fullname ?? '',
        username: user.username ?? '',
        email: user.email ?? '',
        status: user.status ?? '',
        profile_image: user.profile_image ?? '',
      });
      setImagePreview(user.profile_image ?? '');
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    if (url) {
      setImagePreview(url);
      setFormData((prevData) => ({
        ...prevData,
        profile_image: url,
      }));
    }
  };

  const handleStatusChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    if (value !== 'status') {
      setFormData((prevData) => ({
        ...prevData,
        status: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        status: '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setValidation('User is not logged in.');
      return;
    }

    const { id, password, posts, connections } = user;

    if (
      formData.fullname !== user.fullname ||
      formData.username !== user.username ||
      formData.email !== user.email ||
      formData.status !== user.status ||
      formData.profile_image !== user.profile_image
    ) {
      const payload = {
        id,
        fullname: formData.fullname,
        username: formData.username,
        email: formData.email,
        status: formData.status,
        profile_image: formData.profile_image,
        password: password || '',
        posts,
        connections,
      };

      updatePost(payload);

      setValidation('');
    } else {
      setValidation('No changes detected. Please modify at least one field.');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Edit Profile
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Avatar
            src={imagePreview}
            sx={{ width: 150, height: 150, margin: 'auto' }}
          />
          <TextField
            label="Profile Image URL"
            name="profile_image"
            value={formData.profile_image}
            onChange={handleImageChange}
            fullWidth
            variant="outlined"
            sx={{
              input: { color: '#000000' },
              marginTop: '1rem',
            }}
          />

          <TextField
            label="Full Name"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            sx={{
              input: { color: '#000000' },
              marginTop: '1rem',
            }}
          />

          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            disabled
            sx={{
              input: { color: '#000000' },
              marginTop: '1rem',
            }}
          />

          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            disabled
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

          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ marginTop: 2 }}
          >
            {updatePostIsLoading ? (
              <CircularProgress size={24} />
            ) : (
              'Save Changes'
            )}
          </Button>

          {validation && (
            <Typography variant="body2" color="error" sx={{ mb: 2 }}>
              {validation}
            </Typography>
          )}

          {showSuccessAlert && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Profile updated successfully!
            </Alert>
          )}
        </Stack>
      </form>
    </Box>
  );
};

export default EditProfile;
