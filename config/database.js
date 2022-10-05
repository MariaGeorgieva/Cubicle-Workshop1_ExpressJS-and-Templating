const mongoose = require('mongoose');

const connectStr = process.env.DATABASE_CONNECTION_STRING || 'mongodb://localhost:27017/cubicle'

module.exports = async (app) => {
    try {
        await mongoose.connect(connectStr, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });

        console.log('Database connected')

    } catch (error) {
        console.error('Error initializing database');
        console.log(error.message);
        process.exit(1);

    }
}