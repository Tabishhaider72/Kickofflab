// services/EventService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000';

const createEvent = (event, token) =>
  axios.post(`${API_URL}/events`, event, {
    headers: { Authorization: token },
  });

const getEvents = (token) =>
  axios.get(`${API_URL}/events`, { headers: { Authorization: token } });

const updateEvent = (id, event, token) =>
  axios.put(`${API_URL}/events/${id}`, event, {
    headers: { Authorization: token },
  });

const deleteEvent = (id, token) =>
  axios.delete(`${API_URL}/events/${id}`, { headers: { Authorization: token } });

export default { createEvent, getEvents, updateEvent, deleteEvent };
