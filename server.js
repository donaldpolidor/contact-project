require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/contacts', contactRoutes);

// Route that returns “Hello World”
app.get('/', (req, res) => {
  res.send('Hello World');
});

// API info route 
app.get('/api', (req, res) => {
  res.json({ 
    message: 'Contacts API is running!',
    version: '1.0.0',
    endpoints: [
      { method: 'GET', path: '/contacts', description: 'Get all contacts' },
      { method: 'GET', path: '/contacts/:id', description: 'Get single contact' }
    ]
  });
}); 

// Connexion MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/contactsDB')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Home: http://localhost:${PORT}`);
      console.log(`API Info: http://localhost:${PORT}/api`);
      console.log(`Contacts: http://localhost:${PORT}/contacts`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });