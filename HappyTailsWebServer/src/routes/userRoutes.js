const express = require('express');

const userController = require('../controllers/userController');


const router = express.Router();

router.get('/:userId', userController.getUserById);

router.post('/signup', userController.signup);

router.post('/signin', userController.signin);

router.put('/:userId', userController.upload.single('imageUrl'), userController.updateUserById);

router.post('/contact', userController.postContactMessage);

router.post('/reset-password-request', userController.requestPasswordReset);

router.post('/reset-password-code', userController.resetPasswordCode);

router.post('/reset-password', userController.resetPassword);

module.exports = router;

