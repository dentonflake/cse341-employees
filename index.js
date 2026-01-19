const express = require('express');
const mongodb = require('./data/database');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();

// Set the port
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(
  bodyParser.json()
);

// CORS Middleware
app.use((req, res, next) => {

  res.setHeader(
    'Access-Control-Allow-Origin',
    '*'
  );

  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );

  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );

  next();
});

// Import and use routes
app.use('/', require('./routes'));

// Initialize database and start server
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => console.log(`Database is listening and node is running on port http://localhost:${port}`));
  }
});