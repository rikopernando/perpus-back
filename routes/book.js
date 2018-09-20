const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth')
const { index, search, create } = require('../controllers/BookController')

router.get('/', auth, index)
router.get('/search', auth, search)
router.post('/create', create)

module.exports = router;
