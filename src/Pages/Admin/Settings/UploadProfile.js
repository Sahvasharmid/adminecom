import React, { useState, useContext } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';
import { AuthContext } from '../../../utils/AuthContext'; // Adjust the path as needed

const UpdateProfile = () => {
  const { auth } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    email: '',
    name: '',
    password: '',
    avatar: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
        `https://api.escuelajs.co/api/v1/users/${auth.user.id}`,
        {
          email: userData.email,
          name: userData.name,
          // Optionally include password or avatar if you plan to update them
        },
        {
          headers: {
            'Authorization': `Bearer ${auth.token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Profile updated:', response.data);
      alert('Profile updated successfully');
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
        />
        <TextField
          label="Name"
          name="name"
          value={userData.name}
          onChange={handleChangeInput}
          fullWidth
          margin="normal"
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
