const credentials = require('./credentials')
const mongoose = require('mongoose');
const connectionString = credentials.mongo.connectionString
async function connect() {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('connect successfully')
    } catch (e) {
        console.log('connect failure')
    }
}

module.exports = { connect };