// frontend/src/pages/Login.js
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';
import { TextField, Button, Container } from '@mui/material';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    history.push('/');
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />
        <Button type="submit" variant="contained" color="primary">Login</Button>
      </form>
    </Container>
  );
};

export default Login;
