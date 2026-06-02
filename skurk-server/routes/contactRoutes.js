const express = require('express');
const router = express.Router();
const {getContacts, postContacts, getContactById, updateContact, deleteContact } = require('../controllers/contactController');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);

// Definera routes
// GET på api/contacts
router.route('/')
.get(getContacts)
.post(postContacts);



// GET :id
// PUT :id
// DELETE :id
router.route('/:id')
.get(getContactById)
.put(updateContact)
.delete(deleteContact);




module.exports = router;