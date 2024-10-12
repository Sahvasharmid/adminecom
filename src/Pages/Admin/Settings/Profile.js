import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Box, Card, CardContent } from '@mui/material';
import { useSelector } from 'react-redux';

const ProfileTab = () => {
  const { user, token } = useSelector((state) => state.auth); // Accessing user and token from auth slice
  const [userData, setUserData] = useState({
    email: '',
    name: '',
    avatar: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user) {
        try {
          const response = await axios.get(
            `https://api.escuelajs.co/api/v1/users/${user.id}`,
            {
              headers: {
                'Authorization': `Bearer ${token}`, // Include token in the headers
              },
            }
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
  }, [user, token]); // Only depend on user and token

  return (
    <Card sx={{ maxWidth: '100%', margin: 'auto', marginTop: 2 }}>
      <CardContent>
        <Box sx={{ padding: 1 }}>
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
