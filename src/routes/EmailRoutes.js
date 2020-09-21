const express = require('express');
const { sendEmail } = require('../controller/EmailHandler');
const router = express.Router();
const {handler} = require('../ErrorHandler/User');

//Calling Email
router.post('/email',handler, sendEmail);

module.exports = router;