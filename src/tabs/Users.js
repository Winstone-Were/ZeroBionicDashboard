import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block'; // Import Block icon from Material-UI

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users when component mounts
    fetch('http://localhost:3000/admin/listallusers', { method: 'GET' })
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleDeleteUser = (userId) => {
    // Placeholder for future endpoint connection
    console.log(`Deleting user with ID: ${userId}`);
  };

  const handleBanUser = (userId) => {
    // Placeholder for future endpoint connection
    console.log(`Banning user with ID: ${userId}`);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Users
      </Typography>
      <Button variant="contained" color="primary" style={{ marginBottom: '16px' }}>
        Create User
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.uid}>
                <TableCell>
                  <Link to={`/users/${user.uid}`}>
                    {user.uid}
                  </Link>
                </TableCell>
                <TableCell>
                  <a href={`mailto:${user.email}`}>
                    {user.email}
                  </a>
                </TableCell>
                <TableCell>
                <IconButton onClick={() => handleBanUser(user.uid)} aria-label="ban">
                <BlockIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteUser(user.uid)} aria-label="delete">
                  <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Users;
