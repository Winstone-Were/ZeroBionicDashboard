// src/components/Dashboard.js

import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import SummaryCard from './SummaryCards'; // Assuming you have a SummaryCard component
import ToDoList from './ToDoList';
import PieChart from './PieChart';

function Dashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [workerCount, setWorkerCount] = useState(0);
  const [jobsDone, setJobsDone] = useState(0);
  const [acceptedRequests, setAcceptedRequests] = useState(0);
  const workerData = [
    { y: 35, label: "Electrician" },
    { y: 20, label: "Maid" },
    { y: 10, label: "Gardener" },
    { y: 5, label: "Chef" },
    { y: 5, label: "Exterminator" },
    { y: 10, label: "Plumber" },
    { y: 10, label: "Carpenter" },
    { y: 5, label: "Pet Services" }
  ];

  useEffect(() => {
    // Fetch total users count
    fetch('http://localhost:3000/admin/countusers', { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        setTotalUsers(data);
      })
      .catch(error => console.error('Error fetching total users:', error));

    // Fetch accepted requests count
    fetch('http://localhost:3000/admin/countacceptedrequests', { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        setAcceptedRequests(data.totalAcceptedRequests);
      })
      .catch(error => console.error('Error fetching accepted requests:', error));

    // Fetch workers data and count
    fetch('http://localhost:3000/admin/workers', { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        setWorkerCount(data.count);
      })
      .catch(error => console.error('Error fetching workers:', error));

    // 
    // fetch('http://localhost:3000/admin/customers', { method: 'GET' })
    //   .then(response => response.json())
    //   .then(data => {
    //     setCustomers(data.customers);
    //   })
    //   .catch(error => console.error('Error fetching customers:', error));

  }, []);

  return (
    <Box p={3}>
      <Typography variant="h3" gutterBottom>
        Dashboard
      </Typography>
      <Box display="flex" justifyContent="space-between" flexWrap="wrap">
        <SummaryCard title="Total Users" value={totalUsers} />
        <SummaryCard title="Customers" value={customers} /> {/* Placeholder for customers */}
        <SummaryCard title="Workers" value={workerCount} />
        <SummaryCard title="Accepted Requests" value={acceptedRequests} />
      </Box>
      <Box mt={2}>
        <Typography variant="h5" gutterBottom>
          Worker Categories Percentage
        </Typography>
        <PieChart dataPoints={workerData} title="Worker Categories" />
      </Box>
      <Box mt={2} bgcolor="white" p={2} borderRadius={8}>
        <Typography variant="h5" gutterBottom>
          To-Do List
        </Typography>
        <ToDoList />
      </Box>
    </Box>
  );
}
export default Dashboard;