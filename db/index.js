const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://misato:falloutboy@coursecluster-iwdkl.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true})
    .catch(e => {
        console.error('Connection error: ', e.message)
    })

const db = mongoose.connection

module.exports = db