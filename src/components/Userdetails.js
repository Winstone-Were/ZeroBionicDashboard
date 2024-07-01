// src/components/UserDetails.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';

function UserDetails() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user details when component mounts
    fetch(`http://localhost:3000/admin/user/${userId}`, { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box component={Paper} p={3}>
      <Typography variant="h4" gutterBottom>
        User Details
      </Typography>
      {user ? (
        <pre>{JSON.stringify(user, null, 2)}</pre>
      ) : (
        <Typography variant="body1">User not found.</Typography>
      )}
    </Box>
  );
}

export default UserDetails;
