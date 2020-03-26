const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Faculty = new Schema (
    {
        fac_name: { type: String, required: true },
        boss:     { type: String, required: false },
        contact:  { type: String, required: false},
    }
)

module.exports = mongoose.model('Faculties', Faculty)