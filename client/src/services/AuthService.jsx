// services/AuthService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000';

const register = (username, password) =>
  axios.post(`${API_URL}/register`, { username, password });

const login = (username, password) =>
  axios.post(`${API_URL}/login`, { username, password });

export default { register, login };
