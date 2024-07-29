const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
                        .then(() => console.log('Connected to MongoDB'))
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectDb;