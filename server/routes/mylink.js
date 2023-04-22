const express = require('express')
const router = express.Router()
const mylinkController = require('../controllers/mylinkController.js')

/**
 *  myLink Routes
 */

router.get('/', mylinkController.homepage)
router.get('/add', mylinkController.addLink)
router.post('/add', mylinkController.postLink)
router.get('/view/:id', mylinkController.view)
router.get('/edit/:id', mylinkController.edit)  // renders edit page
router.put('/edit/:id', mylinkController.editPost)
router.delete('/edit/:id', mylinkController.deleteRecord)
router.post('/search', mylinkController.searchDatabase)

module.exports = router