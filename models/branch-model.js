const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Branch = new Schema (
    {
        bra_name:       { type: String, required: true },
        faculty_id:     { type: Schema.Types.ObjectId, required: true },
        bra_type:       { type: String, required: false },
        boss:           { type: String, required: false },
        contact:        { type: String, required: false },
    }
)

module.exports = mongoose.model('Branches', Branch)