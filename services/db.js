const mongoose = require('mongoose');
const config = require('./keys');

const connectDB = () => {
    mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER || config.MONGODB_USER}:${process.env.MONGODB_PASS || config.MONGODB_PASS}@cluster1-edkxt.mongodb.net/test?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Database has been penetrated!');
    })
    .catch((err) => {
        console.log(err);
    });
}

module.exports = connectDB