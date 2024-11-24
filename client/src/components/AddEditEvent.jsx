// components/AddEditEvent.jsx
import { useState } from 'react';
import EventService from '../services/EventService';

function AddEditEvent() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate,] = useState('');

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    await EventService.createEvent(
      { title, description, startDate, endDate },
      token
    );
    window.location.href = '/events';
  };

  return (
    <div style={styles.formContainer}>
      <h2 style={styles.heading}>Add/Edit Event</h2>
      <input
        type="text"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
        style={styles.input}
      />
      <input
        type="datetime-local"
        onChange={(e) => setStartDate(e.target.value)}
        style={styles.input}
      />
      
      <button onClick={handleSave} style={styles.saveButton}>
        Save
      </button>
    </div>
  );
}

const styles = {
  formContainer: {
    padding: '35px',
    fontFamily: '-apple-system',
    backgroundColor: 'white',
    borderRadius: '8px',
    
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '12px',
    margin: '8px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  saveButton: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#04AA6D',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default AddEditEvent;
