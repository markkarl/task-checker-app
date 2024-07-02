// frontend/src/pages/Dashboard.js
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Container, List, ListItem, ListItemText, Button } from '@mui/material';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get('/api/tasks', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTasks(response.data);
    };
    fetchTasks();
  }, [user]);

  return (
    <Container>
      <h1>Welcome, {user.name}</h1>
      <List>
        {tasks.map((task) => (
          <ListItem key={task._id}>
            <ListItemText primary={task.title} secondary={`Due: ${task.dueDate}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Dashboard;
