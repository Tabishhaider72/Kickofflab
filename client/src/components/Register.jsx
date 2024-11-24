// components/Register.jsx
import { useState } from 'react';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await AuthService.register(username, password);
      alert('Registration successful!');
      navigate('/');
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <div style={styles.formContainer}>
      <h2 style={styles.heading}>Register</h2>
      <div style={styles.imgContainer}>
        <img
          src="https://avatar.iran.liara.run/public/48" 
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

        <button onClick={handleRegister} style={styles.registerButton}>Register</button>
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
  registerButton: {
    backgroundColor: '#04AA6D',
    color: 'white',
    padding: '14px 20px',
    margin: '8px 0',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
    borderRadius: '4px',
  },
};

export default Register;
