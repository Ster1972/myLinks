const express = require('express')
const router = express.Router()
const mylinkController = require('../controllers/mylinkController.js')
const { flash } = require('express-flash-message')

function checkAuthenticated  (req, res, next) {
  if (req.isAuthenticated()) {
     return next();
 }
 res.redirect('/')
}

function checkNotAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
      return res.redirect('/homepage')
  }
  next()
}
/**
 *  myLink Routes
 */
//router.use((req, res, next) => {
  //  res.locals.messages = getFlashMessages(req, res);
  //  next();
//  })
router.get('/homepage', checkAuthenticated, mylinkController.homepage)
router.get('/add',  checkAuthenticated, mylinkController.addLink)
router.post('/add',  checkAuthenticated, mylinkController.postLink)
router.get('/view/:id',  checkAuthenticated, mylinkController.view)
router.get('/edit/:id',  checkAuthenticated, mylinkController.edit)  // renders edit page
router.put('/edit/:id',  checkAuthenticated, mylinkController.editPost)
router.delete('/edit/:id',  checkAuthenticated, mylinkController.deleteRecord)
router.post('/search',  checkAuthenticated, mylinkController.searchDatabase)
router.delete('/logout',  checkAuthenticated, mylinkController.logout)
router.get('/logout',  checkAuthenticated, mylinkController.getlogout)
router.post('/', mylinkController.postlogin)
router.get('/', checkNotAuthenticated, mylinkController.login)
router.get('/about',  checkAuthenticated, mylinkController.about)



module.exports = router