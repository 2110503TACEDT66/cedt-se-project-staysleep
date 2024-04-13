const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

//load env vars
dotenv.config({ path: './config/config.env' });

//Connect to database
connectDB();

//Route files
const hotels = require('./routes/hotels');
const bookings = require('./routes/bookings');
const auth = require('./routes/auth');
const rooms = require('./routes/rooms');
const reviews = require('./routes/reviews')
const replys = require('./routes/replys')

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // or '*' to allow any origin
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

//Body parser
app.use(express.json());
app.use('/api/v1/hotels', hotels);
app.use('/api/v1/bookings', bookings);
app.use('/api/v1/rooms', rooms);
app.use('/api/v1/auth', auth);
app.use('/api/v1/reviews', reviews)
app.use('/api/v1/replys', replys)

//Cookie parser
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log('Server running in',process.env.NODE_ENV, ' mode on port ', PORT));

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    //Close server and exit process
    server.close(() => process.exit(1));
});