const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth')
const { index, search, create, find, update, destroy } = require('../controllers/AuthorControllers')

router.get('/', auth, index)
router.get('/search', auth, search)
router.post('/create', auth, create)
router.get('/find/:id', auth, find)
router.put('/update/:id', auth, update)
router.delete('/delete/:id', auth, destroy)

module.exports = router;
