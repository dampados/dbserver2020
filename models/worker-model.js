const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Worker = new Schema (
    {
        // name: {
        //     firstName:      { type: String, required: true },
        //     middleName:     { type: String, default:  ""   },
        //     lastName:       { type: String, required: true },
        // },
        firstName:          { type: String, required: true },
        middleName:         { type: String, required: false},
        lastName:           { type: String, required: true },
        position:           { type: String, required: true },
        birth_date:         { type: Date,   required: true },
        speciality:         { type: String, required: true },
        qualification:      { type: String, required: true },
        ovarral_standing:   { type: Number, required: true },
        academic_degree:    { type: String, default: "Отсутствует" },
        academic_rank:      { type: String, default: "Отсутствует" },
        phone_numbers:      { type: [Number] },
        // departments:        { type: [Schema.Types.ObjectId], required: false },     // ToDo: Структура вуза: Добавить в клиент проверку на пустой массив!!!
        branches:           { type: [Schema.Types.ObjectId], required: false },
        laboratories:       { type: [Schema.Types.ObjectId], required: false },
    }
)

module.exports = mongoose.model('Worker', Worker)