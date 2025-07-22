const express = require('express');
const path = require('path');
const homeController = require('./controllers/homeController');
const aboutController = require('./controllers/aboutController');
const contactController = require('./controllers/contactController');

const router = express.Router();

// Static files (handled by express.static in main server file)
router.get('/', homeController);
router.get('/about', aboutController);
router.get('/contact', contactController);

// 404 handler for unknown routes
router.use((req, res) => {
  res.status(404).type('text').send('404 - Page Not Found');
});

module.exports = router;
