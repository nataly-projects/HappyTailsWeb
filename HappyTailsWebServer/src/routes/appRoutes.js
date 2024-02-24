const express = require('express');

const userRoutes = require('./userRoutes');
const petRoutes = require('./petRoutes');
const requestRoutes = require('./requestRoutes');
const categoryRoutes = require('./categoryRoutes');

const router = express.Router();

router.use('/users/', userRoutes);
router.use('/pets/', petRoutes);
router.use('/categories/', categoryRoutes);
router.use('/requests/', requestRoutes);

module.exports = router;