require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(morgan('common'));
app.use(cookieParser());

app.use(
    cors({
        origin: ["http://localhost:5175"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

const port = process.env.PORT || 5000;

const connectDb = require('./db');
const authRouter = require('./routes/auth');
const taskRouter = require('./routes/tasks');

app.use('/api/auth', authRouter);
app.use('/api/tasks', taskRouter);

const startServer = async () => {
    try {
        await connectDb();
        app.listen(port, (req, res) => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

startServer();