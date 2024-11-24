// Requiring and configuring the .env file to access its variables
require('dotenv').config();
// import Morgan for middleware
const morgan = require('morgan')
// import Cors for middleware
const cors =  require('cors')
// Requiring express
const express = require('express');
// Creating the express server and storing inside the app variable
const app = express();
// Port in which the server will run on
const PORT = process.env.PORT || 8000;

// Requiring user & org router
const userRouter = require('./routes/users.js');
const orgRouter = require('./routes/organizations.js');

// Configuring the server to accept and parse JSON data.
app.use(express.json());

// Middleware
app.use(morgan('dev'))
app.use(cors())

//Custom Middlware
// app.use((req, res, next) => {
//   console.log(`A ${req.method} request was made to ${req.url}`);
//   next();
// });

// Routes: Connecting the router to the server
app.use('/user', userRouter);
app.use('/organization', orgRouter);


// Error Handling Middlware
app.use((err, req, res, next) => {
  res.status(500).send('Something went wrong.');
});

// Calling the listen function telling the server to listen on port 3000
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
