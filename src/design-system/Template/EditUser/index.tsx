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
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { statusOptions } from '@/utils';
import { useCreatePost } from '@/hooks/API';

const EditProfile: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { updatePost, updatePostIsLoading } = useCreatePost();
  const router = useRouter();

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
    setFormData((prevData) => ({
      ...prevData,
      status: value === 'status' ? '' : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setValidation('User is not logged in.');
      return;
    }

    if (
      formData.fullname !== user.fullname ||
      formData.username !== user.username ||
      formData.email !== user.email ||
      formData.status !== user.status ||
      formData.profile_image !== user.profile_image
    ) {
      const payload = {
        ...user,
        fullname: formData.fullname,
        username: formData.username,
        email: formData.email,
        status: formData.status,
        profile_image: formData.profile_image,
      };

      updatePost(payload);
      setValidation('');
      setShowSuccessAlert(true);
    } else {
      setValidation('No changes detected. Please modify at least one field.');
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
        padding: 3,
      }}
    >
      <Box
        sx={{
          maxWidth: 600,
          width: '100%',
          padding: 3,
          borderRadius: 3,
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          backgroundColor: '#fff',
          position: 'relative',
        }}
      >
        <IconButton
          onClick={() => router.back()}
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
          }}
        >
          <ArrowBackIcon sx={{ color: '#000' }} />
        </IconButton>

        <Typography
          variant="h4"
          gutterBottom
          sx={{
            textAlign: 'center',
            fontWeight: 600,
            color: '#000',
            marginBottom: 3,
          }}
        >
          Edit Profile
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 3,
              }}
            >
              <Avatar
                src={imagePreview}
                alt="Profile Image"
                sx={{
                  width: 150,
                  height: 150,
                  borderRadius: 2,
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                }}
              />
            </Box>

            <TextField
              label="Profile Image URL"
              name="profile_image"
              value={formData.profile_image}
              onChange={handleImageChange}
              fullWidth
              variant="outlined"
              sx={{ input: { color: '#000' } }}
            />

            <TextField
              label="Full Name"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{ input: { color: '#000' } }}
            />

            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              disabled
              sx={{ input: { color: '#000' } }}
            />

            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              disabled
              sx={{ input: { color: '#000' } }}
            />

            <FormControl fullWidth variant="outlined">
              <InputLabel id="status-label">Status</InputLabel>
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
                }}
              >
                <MenuItem
                  value="status"
                  disabled
                  sx={{
                    color: '#000',
                    '&.Mui-selected': {
                      backgroundColor: '#f0f0f0',
                    },
                    '&:hover': {
                      backgroundColor: '#e0e0e0',
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
                      color: '#000',
                      '&.Mui-selected': {
                        backgroundColor: '#f0f0f0',
                      },
                      '&:hover': {
                        backgroundColor: '#e0e0e0',
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
              sx={{
                padding: 1,
                fontWeight: 600,
                fontSize: '1rem',
                textTransform: 'none',
              }}
            >
              {updatePostIsLoading ? (
                <CircularProgress size={24} sx={{ color: '#fff' }} />
              ) : (
                'Save Changes'
              )}
            </Button>

            {validation && (
              <Typography
                variant="body2"
                color="error"
                sx={{ textAlign: 'center' }}
              >
                {validation}
              </Typography>
            )}

            {showSuccessAlert && (
              <Alert severity="success" sx={{ textAlign: 'center' }}>
                Profile updated successfully!
              </Alert>
            )}
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default EditProfile;
