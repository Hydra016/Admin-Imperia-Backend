const express = require('express');
const router = express.Router();
const { loginUser, signupUser } = require('../controllers/usersController');
const upload = require('../middlewares/upload');

router.post('/signup', upload.single('avatar'), signupUser)
router.post('/login', loginUser)

module.exports = router;