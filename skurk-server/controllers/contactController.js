// CONTROLLER ska ta emot HTTP requests och returnera HTTP responses
// Varje funktion är en route handler

const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

// @desc    GET all contacts
// @route   GET /api/contacts
// @access  private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user._id });

    res.status(200).json(contacts);
});

// @desc    POST a contact
// @route   POST /api/contacts
// @access  private
const postContacts = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        res.status(400);
        throw new Error('Alla fält måste fyllas i');
    }

    const contact = await Contact.create({
        user_id: req.user._id,
        name,
        email,
        phone
    });

    res.status(201).json(contact);
});

// @desc    GET a single contact
// @route   GET /api/contacts/:id
// @access  Private
const getContactById = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error('Kontakt hittades inte');
    }

    res.status(200).json(contact);
});

// @desc    PUT a single contact
// @route   PUT /api/contacts/:id
// @access  Private
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error('Kontakt hittades inte');
    }

    if(contact.user_id.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error('Du har inte behörighet att uppdatera denna kontakt');
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    res.status(200).json(updatedContact);
});

// @desc    DELETE a single contact
// @route   DELETE /api/contacts/:id
// @access  Private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error('Kontakt hittades inte');
    }

    if(contact.user_id.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error('Du har inte behörighet att uppdatera denna kontakt');
    }

    
    await Contact.findByIdAndDelete(req.params.id);

    res.status(200).json({
        message: 'Kontakt borttagen',
        id: req.params.id
    });
});

module.exports = {
    getContacts,
    postContacts,
    getContactById,
    updateContact,
    deleteContact
};