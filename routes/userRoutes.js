const express = require('express');
const router = express.Router();
const { loginUser, signupUser, getAllUsers, approveUser, deleteUser, getSingleUser } = require('../controllers/usersController');
const upload = require('../middlewares/upload');
const verifyToken = require('../middlewares/verifyToken');

router.get('/users', getAllUsers)
router.post('/signup', signupUser)
router.post('/login', loginUser)
router.put('/approve', approveUser)
router.delete('/delete/:id', deleteUser)
router.get('/singleUser/:id', getSingleUser)

module.exports = router;