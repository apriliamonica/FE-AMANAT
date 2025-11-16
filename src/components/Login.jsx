import React, { useState } from 'react';
import Input from './common/Input';
import Button from './common/Button';
import '../../styles/global.css';
import '../../styles/login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy login logic, replace with real auth
    if (username && password) {
      setError('');
      onLogin({ username });
    } else {
      setError('Username dan password wajib diisi');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Input
          label="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Masukkan username"
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Masukkan password"
        />
        {error && <div className="error-message">{error}</div>}
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default Login;
