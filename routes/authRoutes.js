const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/auth/google/callback', passport.authenticate('google'));

router.get('/api/current_user', (req, res) => {
    res.json({success: true, user: req.user});
});

router.get('/api/logout', (req, res) => {
    req.logOut();
    res.send(req.user);
});

module.exports = router