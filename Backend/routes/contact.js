const express = require('express');
const router = express.Router();
const Contact = require('../models/ContactMessages.js');


router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { fullName, email, msg } = req.body;
    const newMsg = new Contact({ fullName, email, msg });
    await newMsg.save();
    res.status(201).json({ message: 'Message saved' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
