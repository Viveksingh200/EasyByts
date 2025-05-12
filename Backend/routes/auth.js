// routes/auth.js
const express = require('express');
const passport = require('passport');
const router = express.Router();

// Check if user is authenticated
router.get('/check', (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ isAuthenticated: true });
  } else {
    return res.json({ isAuthenticated: false });
  }
});

// Get current user details
router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    return res.json(req.user);
  } else {
    return res.status(401).json({ message: 'Not authenticated' });
  }
});

// Signup Route
router.post('/signup', (req, res, next) => {
  // Passport's local strategy or registration logic goes here
  passport.authenticate('local-signup', (err, user) => {
    if (err) return res.status(500).json({ error: 'Server error' });
    if (!user) return res.status(400).json({ error: 'Signup failed' });

    req.login(user, (err) => {
      if (err) return res.status(500).json({ error: 'Error during login' });
      return res.status(200).json({ message: 'Signup successful', user });
    });
  })(req, res, next);
});


// Login Route
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(401).json({ error: info?.message });

    req.logIn(user, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.json({ success: true, user });
    });
  })(req, res, next);
});

// Logout Route
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: 'Error during logout' });
    return res.status(200).json({ message: 'Logged out successfully' });
  });
});

module.exports = router;
