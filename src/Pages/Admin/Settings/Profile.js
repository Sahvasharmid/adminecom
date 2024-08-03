import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Typography, Box, Card, CardContent } from '@mui/material';
import { AuthContext } from '../../../utils/AuthContext'; // Adjust the path as needed

const ProfileTab = () => {
  const { auth } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    email: '',
    name: '',
    avatar: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (auth.isAuthenticated) {
        try {
          const response = await axios.get(
            `https://api.escuelajs.co/api/v1/users/${auth.user.id}`
          );
          setUserData({
            email: response.data.email || '',
            name: response.data.name || '',
            avatar: response.data.avatar || '',
          });
        } catch (err) {
          console.error('Error fetching user details:', err);
          setError('Failed to fetch user details');
        }
      }
    };

    fetchUserDetails();
  }, [auth.isAuthenticated, auth.user.id]);

  return (
    <Card sx={{ maxWidth: '100%', margin: 'auto', marginTop: 2 }}>
      <CardContent>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6">Profile Details</Typography>
          {userData.avatar && (
            <Typography>
              <img src={userData.avatar} alt="Avatar" style={{ width: '100px', height: '100px' }} />
            </Typography>
          )}
          <Typography>Email: {userData.email}</Typography>
          <Typography>Name: {userData.name}</Typography>
          {error && <Typography color="error">{error}</Typography>}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileTab;
