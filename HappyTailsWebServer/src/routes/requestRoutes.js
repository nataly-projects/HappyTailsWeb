const express = require('express');

const {getUserRequests, getUserNotifications, getUserAdoptedPets, addRequest, acceptRequest, denyRequest} = require('../controllers/requestController');

const router = express.Router();

router.get('/requests/:userId', getUserRequests);
router.get('/notification/:userId', getUserNotifications);
router.get('/adopted-pets/:userId', getUserAdoptedPets);
router.post('/', addRequest);
router.put('/accept/', acceptRequest);
router.put('/deny', denyRequest);


module.exports = router;
