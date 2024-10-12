import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../../../redux/features/AuthSlice/AuthSlice'; // Adjust the path as needed

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth); // Accessing user and token from auth slice
  const [userData, setUserData] = useState({
    email: '',
    name: '',
    password: '',
    avatar: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user data to pre-fill the form
  useEffect(() => {
    if (user) {
      setUserData({
        email: user.email,
        name: user.name,
        avatar: user.avatar, // Assuming you may use it later
      });
    }
  }, [user]);

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(
        `https://api.escuelajs.co/api/v1/users/${user.id}`,
        {
          email: userData.email,
          name: userData.name,
          // Optionally include password or avatar if you plan to update them
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Profile updated:', response.data);
      alert('Profile updated successfully');
      // Optionally, you can dispatch an action to fetch the updated profile
      dispatch(fetchProfile()); // Fetch updated profile
    } catch (err) {
      console.error('Error updating profile:', err.response?.data || err.message);
      setError(`Failed to update profile: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6">Update Profile</Typography>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <TextField
          label="Email"
          name="email"
          value={userData.email}
          onChange={handleChangeInput}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Name"
          name="name"
          value={userData.name}
          onChange={handleChangeInput}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={userData.password}
          onChange={handleChangeInput}
          fullWidth
          margin="normal"
        />
        <Box sx={{ marginTop: 3 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </Button>
        </Box>
        {error && <Typography color="error">{error}</Typography>}
      </form>
    </Box>
  );
};

export default UpdateProfile;
