const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/social-network', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        console.log(`MongoBD Connect: ${connect.connection.host}`);
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;