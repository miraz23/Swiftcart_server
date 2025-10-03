const router = require('express').Router();
const userController = require('../controllers/userController');

// Upsert current user (public endpoint; relies on Firebase auth in frontend)
router.route('/').post(userController.upsertUser);

module.exports = router;


