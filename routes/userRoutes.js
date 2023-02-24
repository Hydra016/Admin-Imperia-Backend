const express = require('express');
const router = express.Router();
const { loginUser, signupUser, getAllUsers, approveUser, deleteUser } = require('../controllers/usersController');
const upload = require('../middlewares/upload');

router.get('/users', getAllUsers)
router.post('/signup', signupUser)
router.post('/login', loginUser)
router.put('/approve', approveUser)
router.delete('/delete/:id', deleteUser)

module.exports = router;