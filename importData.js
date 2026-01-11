require('dotenv').config();
const mongoose = require('mongoose');
const Contact = require('./models/contact.js');
const contactsData = require('./data/contacts.json');

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Empty the collection
    await Contact.deleteMany({});
    console.log('Existing contacts deleted');
    
    // Add new contacts
    const contacts = await Contact.insertMany(contactsData);
    console.log(`${contacts.length} contacts imported successfully`);
    
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error:', err);
    mongoose.connection.close();
  });