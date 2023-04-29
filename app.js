require('dotenv').config()
const User = require('./server/models/Links.js')
const express = require('express')
const expressLayout = require('express-ejs-layouts')
const methodOverride = require('method-override')
const { flash } = require('express-flash-message')
const brcrypt = require('bcryptjs')
const passport = require('passport')
const initializePassport = require('./server/config/passport-config.js')
const session = require('express-session')
const connectDB = require('./server/config/db.js')

const app = express()
const port = process.env.PORT || 5056

initializePassport(passport)

// Connect to Database
connectDB().then(() => {
  app.listen(port, () => {
    console.log("listening for requests")
  })
})

app.use(express.urlencoded({ extended: true}))

app.use(express.json())
app.use(methodOverride('_method'))

// Static Files
app.use(express.static('public'))

// Express session (cookies)
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      }
    })
  )

app.use(passport.initialize())
app.use(passport.session())

// Flash message

// app.use(
//     flash({ 
//         sessionKeyName: 'express-flash-message', }))

app.use(flash())

// Templating Engine
app.use(expressLayout)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')

// Routes
app.use('/', require('./server/routes/mylink.js'))

// Handle 404 

app.get('*', (req, res) => {
    res.status(404).render('404.ejs')
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

