
import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';

function WorkersList() {
  const [workers, setWorkers] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/admin/getworkers', { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        setWorkers(data.workers);
        setCount(data.count);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching workers:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Workers
      </Typography>
      <Typography variant="h6" gutterBottom>
        Total Workers: {count}
      </Typography>
      <List>
        {workers.map((worker, index) => (
          <ListItem key={index}>
            <ListItemText primary={worker.username} secondary={worker.email} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default WorkersList;
