require('dotenv').config();
const mongoose = require('mongoose');

module.exports = mongoose.connect(process.env.MONGO_LINK, { //connecting to mongoDB
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to the database');
}).catch(err => { //error checking
    console.log(err);
});