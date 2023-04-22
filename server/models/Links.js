const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LinksSchema = new Schema ({
    title: {type: String},
    category: {type: String},
    linkuri: {type: String},
    notes: {type: String},
    createdAt: {type: Date, default: Date.now()}
})



module.exports = mongoose.model('Link', LinksSchema)