const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');

const app = express();

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('hello'));

// Use Routes
app.use('/api/users', users);
app.use('/api/profiles', profiles);

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
