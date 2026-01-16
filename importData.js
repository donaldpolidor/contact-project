require('dotenv').config();
const mongoose = require('mongoose');
const Contact = require('./models/contact.js');
const contactsData = require('./data/contacts.json');

// Use the database connection from config
const connectDB = require('./config/database');

async function importData() {
  try {
    // Connect to MongoDB
    await connectDB();
    
    console.log(' Connected to MongoDB');
    
    // Empty the collection
    await Contact.deleteMany({});
    console.log('  Existing contacts deleted');
    
    // Add new contacts
    const contacts = await Contact.insertMany(contactsData);
    console.log(` ${contacts.length} contacts imported successfully`);
    
    console.log(' Sample contacts created:');
    contacts.forEach(contact => {
      console.log(`  - ${contact.firstName} ${contact.lastName} (${contact.email})`);
    });
    
    // Close connection
    mongoose.connection.close();
    console.log(' MongoDB connection closed');
    process.exit(0);
  } catch (err) {
    console.error(' Error:', err);
    mongoose.connection.close();
    process.exit(1);
  }
}

importData();
