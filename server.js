const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');
const games = require('./routes/api/games');
const requests = require('./routes/api/requests');
const test = require('./routes/api/test');

const app = express();

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const middleware = [
  bodyParser.urlencoded({ extended: false }),
  bodyParser.json(),
  passport.initialize(),
  cors()
];

// Passport, Cors and Body Parser Middlewares
app.use(...middleware);

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/profiles', profiles);
app.use('/api/games', games);
app.use('/api/requests', requests);
app.use('/api/test', test);

const port = process.env.port || 5000;

app.listen(port, () =>
  console.log(
    `Server running on port ${port}\n CORS-enabled web server listening on port ${port}`
  )
);
