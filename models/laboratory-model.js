const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Laboratory = new Schema (
    {
        lab_name:   { type: String, required: true },
        boss:       { type: String, required: false },
        contact:    { type: String, required: false},
    }
)

module.exports = mongoose.model('Laboratories', Laboratory)