// Import required modules
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const admin = require('firebase-admin');

// Load environment variables
dotenv.config();

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json'); // Firebase Admin SDK key
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL || 'https://test-c8977-default-rtdb.firebaseio.com',
});

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

// Middleware: Authenticate JWT Token
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ error: 'Access Denied: No Token Provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid Token' });
    req.user = user;
    next();
  });
}

// Routes
// 1. User Registration
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userRef = admin.database().ref('users').child(username);

    userRef.set(
      {
        username,
        password: hashedPassword,
      },
      (error) => {
        if (error) return res.status(400).json({ error: 'User already exists' });
        res.status(201).json({ message: 'User registered successfully!' });
      }
    );
  } catch (err) {
    res.status(500).json({ error: 'Server Error: Unable to register user' });
  }
});

// 2. User Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const userRef = admin.database().ref('users/' + username);
    userRef.once('value', async (snapshot) => {
      const user = snapshot.val();
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Server Error: Unable to login' });
  }
});

// 3. Create Event
app.post('/events', authenticateToken, (req, res) => {
  const { title, description, startDate, endDate } = req.body;
  const eventRef = admin.database().ref('events').push();

  eventRef.set(
    {
      title,
      description,
      startDate,
      endDate,
      username: req.user.username,
    },
    (error) => {
      if (error) return res.status(500).json({ error: 'Could not create event' });
      res.status(201).json({ id: eventRef.key, title, description, startDate, endDate });
    }
  );
});

// 4. Get All Events for Logged-In User
app.get('/events', authenticateToken, (req, res) => {
  const eventRef = admin.database().ref('events');
  eventRef.once('value', (snapshot) => {
    const events = [];
    snapshot.forEach((childSnapshot) => {
      const event = childSnapshot.val();
      if (event.username === req.user.username) {
        events.push({ id: childSnapshot.key, ...event });
      }
    });
    res.json(events);
  });
});

// 5. Update Event
app.put('/events/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { title, description, startDate, endDate } = req.body;
  const eventRef = admin.database().ref('events/' + id);

  eventRef.update(
    { title, description, startDate, endDate },
    (error) => {
      if (error) return res.status(500).json({ error: 'Could not update event' });
      res.json({ id, title, description, startDate, endDate });
    }
  );
});

// 6. Delete Event
app.delete('/events/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const eventRef = admin.database().ref('events/' + id);

  eventRef.remove((error) => {
    if (error) return res.status(500).json({ error: 'Could not delete event' });
    res.json({ message: 'Event deleted successfully' });
  });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
