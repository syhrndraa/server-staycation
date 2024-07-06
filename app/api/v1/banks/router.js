const express = require('express');
const router = express();

const { create, index, destroy } = require('./controller');

router.post('/banks', create);
router.get('/banks', index);
router.delete('/banks/:id', destroy);

module.exports = router;
