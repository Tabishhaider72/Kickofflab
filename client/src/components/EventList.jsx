// components/EventList.jsx
import { useState, useEffect } from 'react';
import EventService from '../services/EventService';

function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem('token');
      const response = await EventService.getEvents(token);
      setEvents(response.data);
    };
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await EventService.deleteEvent(id, token);
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <div style={styles.eventListContainer}>
      <h2 style={styles.heading}>Your Events</h2>
      {events.map((event) => (
        <div key={event.id} style={styles.eventCard}>
          <h3 style={styles.eventTitle}>{event.title}</h3>
          <p style={styles.eventDescription}>{event.description}</p>
          <p style={styles.eventDateTime}>
            <strong>Start:</strong> {new Date(event.startDate).toLocaleString()}
          </p>
          <p style={styles.eventDateTime}>
            <strong>End:</strong> {new Date(event.endDate).toLocaleString()}
          </p>
          <button onClick={() => handleDelete(event.id)} style={styles.deleteButton}>Delete</button>
        </div>
      ))}
    </div>
  );
}

const styles = {
  eventListContainer: {
    padding: '15px',
    backgroundColor: 'white',
    borderRadius: '8px',
    
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  eventCard: {
    backgroundColor: '#FFDB58',
    padding: '10px',
    borderRadius: '8px',
    marginBottom: '16px',
  },
  eventTitle: {
    fontSize: '18px',
    color: '#ffffff',
  },
  eventDescription: {
    fontSize: '14px',
    color: '#666',
  },
  eventDateTime: {
    fontSize: '12px',
    color: '#555',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    color: 'white',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default EventList;
