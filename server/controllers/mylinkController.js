const { Link } = require('../models/Links')
const mongoose = require('mongoose')
const passport = require('passport')
//const initializePassport = require('../config/passport-config')

/**
 * GET for HomePage
 */

exports.homepage = async (req, res) => {
    const messages = await req.consumeFlash('info')
    const locals = {
        title: 'Home Page'
    }
    let perPage = 9
    let page = req.query.page || 1

    try {
        const links = await Link.aggregate([{ $sort: { updatedAt: -1}}])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec()
        const count = await Link.count()
        res.render('index', {locals,
             links,
             current: page,
             pages: Math.ceil(count / perPage),
             messages})

    } catch (error) {
        console.log(error)
    }
    
}
/**
 * GET (add new Link page)
 */

exports.addLink = async (req, res) => {
    const locals = {
        title: 'Add Link'
    }
    res.render('Links/add.ejs', {locals})
}

/**
 * POST (create new Link in database)
 */

exports.postLink = async (req, res) => {
    console.log(req.body)
    const newLink = new Link({
        title: req.body.Title,
        category: req.body.Category,
        linkuri: req.body.URL,
        notes: req.body.Notes
    })
    try {
        await Link.create(newLink)
        await req.flash('info', 'New Link has been added')
        res.redirect('/homepage')
    } catch (error) {
        console.log(error) 
    }
    
}

/**
 * GET (get data from database)
 */

exports.view = async (req, res) => {

    try {
        const link = await Link.findOne({ _id: req.params.id })
        const locals = {
            title: "View Links"
        }
        res.render('Links/views.ejs', { locals, link})
    } catch (error) {
        console.log(error)
    }
}

/**
 * GET (edit data from database)
 */

exports.edit = async (req, res) => {

    try {
        const link = await Link.findOne({ _id: req.params.id })
        const locals = {
            title: "Edit Record"
        }
        res.render('Links/edit.ejs', { locals, link})
    } catch (error) {
        console.log(error)
    }
}

/**
 * PUT (Update data in database)
 */

exports.editPost = async (req, res) => {

    try {

        await Link.findByIdAndUpdate(req.params.id, {
            title: req.body.Title,
            category: req.body.Category,
            linkuri: req.body.URL,
            notes: req.body.Notes
        })

        res.redirect(`/homepage`)

    } catch (error) {
        console.log(error)

    }
   
}

/**
 * PUT (Delete record in database)
 */

exports.deleteRecord = async (req, res) => {

    try {

       await Link.deleteOne({ _id: req.params.id })
       res.redirect('/homepage')
    } catch (error) {
        console.log(error)

    }
   
}

/**
 * GET (Search database)
 */

exports.searchDatabase = async (req, res) => {
    const locals = {
        title: "Search Database",
      }

    try {
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
    
        const link = await Link.find({
          $or: [
            { title: { $regex: new RegExp(searchNoSpecialChar, "i") }},
            { category: { $regex: new RegExp(searchNoSpecialChar, "i") }},
          ]
        });
        
        res.render("search.ejs", {
          link,
          locals
        })
        
      } catch (error) {
        console.log(error);
      }
   
}

/**
 * Post for LOGIN
 */

exports.postlogin = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) {
        req.flash('info', 'Bad Email or password used'); // add this line to set the flash message
        return res.redirect('/');
      }

      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.redirect('/homepage');
      });
    })(req, res, next);
  };


exports.login = async (req, res) => {
    const messages = await req.consumeFlash('info')
    const locals = {
        title: 'Login Page'
    }
    res.render('Links/login.ejs', { locals, messages})
}

/**
 * POST for LOGOUT
 */
exports.logout = function(req, res, next) {
    req.logout(function(err){
        if (err) { return next(err);}
        res.redirect('/')
    })
}

/**
 * GET for LOGOUT
 */
exports.getlogout = async (req, res) => {
    const messages = await req.consumeFlash('info')
    const locals = {
        title: 'Logout Page'
    }
    res.render('Links/logout.ejs', { locals, messages})
}

exports.about = async (req, res) => {
    const messages = await req.consumeFlash('info')
    const locals = {
        title: 'About Page'
    }
    res.render('Links/about.ejs', { locals, messages})
}