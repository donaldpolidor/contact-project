const express = require('express');
const router = express.Router();
const {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
} = require('../controllers/contactController');

// Routes for /api/contacts
router.route('/')
  .get(getContacts)
  .post(createContact);

// Routes for /api/contacts/:id
router.route('/:id')
  .get(getContactById)
  .put(updateContact)
  .delete(deleteContact);

module.exports = router;
