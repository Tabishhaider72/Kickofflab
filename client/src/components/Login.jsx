// components/Login.js
import { useState } from 'react';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await AuthService.login(username, password);
      localStorage.setItem('token', response.data.token);
      window.location.href = '/events';
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert('Login failed');
    }
  };

  const redirectToRegister = () => {
    navigate('/register');
  };

  return (
    <div style={styles.formContainer}>
      <h2 style={styles.heading}>Login</h2>
      <div style={styles.imgContainer}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9UdkG68P9AHESMfKJ-2Ybi9pfnqX1tqx3wQ&s" 
          alt="Avatar"
          style={styles.avatar}
        />
      </div>

      <div style={styles.container}>
        <label htmlFor="username"><b>Username</b></label>
        <input
          type="text"
          placeholder="Enter Username"
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />

        <label htmlFor="password"><b>Password</b></label>
        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleLogin} style={styles.loginButton}>Login</button>
        <label>
          <input type="checkbox" defaultChecked style={{ marginRight: '10px' }} /> Remember me
        </label>
      </div>

      <div style={styles.footerContainer}>
        <button type="button" onClick={redirectToRegister} style={styles.registerButton}>
          Register
        </button>
      </div>
    </div>
  );
}

const styles = {
  formContainer: {
    fontFamily: 'Arial, Helvetica, sans-serif',
    border: '3px solid #f1f1f1',
    maxWidth: '400px',
    margin: 'auto',
    padding: '16px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    borderRadius: '8px',
  },
  heading: {
    textAlign: 'center',
  },
  imgContainer: {
    textAlign: 'center',
    marginBottom: '24px',
  },
  avatar: {
    width: '40%',
    borderRadius: '50%',
  },
  container: {
    padding: '16px',
  },
  input: {
    width: '100%',
    padding: '12px 20px',
    margin: '8px 0',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  loginButton: {
    backgroundColor: '#04AA6D',
    color: 'white',
    padding: '14px 20px',
    margin: '8px 0',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
    borderRadius: '4px',
  },
  loginButtonHover: {
    opacity: 0.8,
  },
  footerContainer: {
    backgroundColor: '#f1f1f1',
    textAlign: 'center',
    padding: '16px',
  },
  registerButton: {
    width: 'auto',
    padding: '10px 18px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
  },
};

export default Login;
