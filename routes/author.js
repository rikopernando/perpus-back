const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth')
const { index, search } = require('../controllers/AuthorControllers')

router.get('/', auth, index)
router.get('/search', auth, search)

module.exports = router;
