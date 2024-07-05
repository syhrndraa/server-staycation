const express = require('express');
const router = express();
const { create } = require('./controller');

router.post('/items', create);

module.exports = router;
