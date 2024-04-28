const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const { xss } = require('express-xss-sanitizer');
const helmet = require('helmet');
const hpp = require('hpp');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

//Swagger
// CDN CSS
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Library API',
      version: '1.0.0',
      description: 'An Express Hotel booking API'
    },
    servers: [
      {
        url: 'http://localhost:5000/api/v1'
      },
      {
        url: 'https://hotel-reservation-api-phi.vercel.app/api/v1'
      }
    ]
  },
  apis: ['./routes/*.js'],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

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

//Set security headers
app.use(helmet());

//Sanitize data
app.use(mongoSanitize());

//Prevent XSS attacks
app.use(xss());

//Rate Limiting
const limiter = rateLimit({
  windowsMs: 10 * 60 * 1000,
  max: 1000
});
app.use(limiter);

//Prevent http param pollutions
app.use(hpp());

//Enable CORS
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // or '*' to allow any origin
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

//Body parser
app.use(express.json());

//Mount router
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs, { customCssUrl: CSS_URL }));
app.use('/api/v1/hotels', hotels);
app.use('/api/v1/bookings', bookings);
app.use('/api/v1/rooms', rooms);
app.use('/api/v1/auth', auth);
app.use('/api/v1/reviews', reviews)
app.use('/api/v1/replys', replys)

//Cookie parser
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log('Server running in', process.env.NODE_ENV, ' mode on port ', PORT));

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  //Close server and exit process
  server.close(() => process.exit(1));
});