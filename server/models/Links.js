const mongoose = require('mongoose')
const Schema = mongoose.Schema


const LinksSchema = new Schema ({
    title: {type: String},
    category: {type: String},
    linkuri: {type: String},
    notes: {type: String},
    createdAt: {type: Date, default: Date.now()}
})

const UserSchema = new Schema ({
    name: {type: String},
    email: {type: String},
    password: {type: String}
})

module.exports = {
    Link: mongoose.model('Link', LinksSchema),
    User: mongoose.model('User', UserSchema)
  }
  

